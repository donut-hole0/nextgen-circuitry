<script>
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1;
    let traces = [];
    let pulses = [];
    let nodes = [];
    let raf;

    const TEAL = '0, 229, 176';

    function build() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Lay out a loose grid and route Manhattan traces between random points.
      const gap = Math.max(64, Math.min(w, h) / 9);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const grid = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid.push({
            x: c * gap + (Math.random() - 0.5) * gap * 0.4,
            y: r * gap + (Math.random() - 0.5) * gap * 0.4
          });
        }
      }

      traces = [];
      nodes = [];
      const traceCount = Math.round((w * h) / 90000) + 6;
      for (let i = 0; i < traceCount; i++) {
        const a = grid[Math.floor(Math.random() * grid.length)];
        const b = grid[Math.floor(Math.random() * grid.length)];
        if (!a || !b || a === b) continue;
        // L-shaped (Manhattan) route with a single elbow
        const elbow = Math.random() > 0.5 ? { x: b.x, y: a.y } : { x: a.x, y: b.y };
        const pts = [a, elbow, b];
        traces.push(pts);
        nodes.push(elbow);
        if (Math.random() > 0.4) nodes.push(b);
      }

      // Seed traveling pulses on a subset of traces
      pulses = [];
      const pulseCount = Math.min(traces.length, 14);
      for (let i = 0; i < pulseCount; i++) {
        pulses.push({
          trace: Math.floor(Math.random() * traces.length),
          t: Math.random(),
          speed: 0.0016 + Math.random() * 0.0026
        });
      }
    }

    function lerp(p1, p2, t) {
      return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t };
    }

    // position along a 3-point polyline by normalized t (0..1)
    function pointOnTrace(pts, t) {
      const segLen = [];
      let total = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const d = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
        segLen.push(d);
        total += d;
      }
      let dist = t * total;
      for (let i = 0; i < segLen.length; i++) {
        if (dist <= segLen[i]) return lerp(pts[i], pts[i + 1], segLen[i] ? dist / segLen[i] : 0);
        dist -= segLen[i];
      }
      return pts[pts.length - 1];
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      // traces
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${TEAL}, 0.10)`;
      for (const pts of traces) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
      // node pads
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL}, 0.28)`;
        ctx.fill();
      }
    }

    function frame() {
      drawStatic();
      // pulses
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.trace = Math.floor(Math.random() * traces.length);
          p.speed = 0.0016 + Math.random() * 0.0026;
        }
        const pts = traces[p.trace];
        if (!pts) continue;
        const pos = pointOnTrace(pts, p.t);
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 9);
        grad.addColorStop(0, `rgba(${TEAL}, 0.9)`);
        grad.addColorStop(1, `rgba(${TEAL}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(180, 255, 235, 0.95)`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    build();
    if (reduce) {
      drawStatic();
    } else {
      frame();
    }

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduce) drawStatic();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }
</style>
