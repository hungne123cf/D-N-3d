/*
  particles.js
  - Ambient particle emitter for the hero background
  - Also used for a lightweight interactive trail.
*/

export function initParticles({ canvasId }) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // This module draws 2D overlay particles on top of WebGL canvas.
  // Keep it lightweight; do not render too many.

  const state = {
    w: 0,
    h: 0,
    dpr: Math.min(2, window.devicePixelRatio || 1),
    points: [],
    last: 0,
    raf: 0,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    mouseVel: { x: 0, y: 0 },
    lastMouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  };

  const resize = () => {
    state.w = window.innerWidth;
    state.h = window.innerHeight;
    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    canvas.style.width = `${state.w}px`;
    canvas.style.height = `${state.h}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  };

  resize();
  window.addEventListener('resize', resize);

  const spawn = (x, y, strength = 1) => {
    const n = Math.floor(3 * strength);
    for (let i = 0; i < n; i++) {
      state.points.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7 * strength,
        vy: (Math.random() - 0.5) * 0.7 * strength,
        life: Math.random() * 45 + 30,
        maxLife: 60,
        r: Math.random() * 2.2 + 0.6,
        c: Math.random() > 0.5 ? 'rgba(0,245,255,0.9)' : 'rgba(191,0,255,0.9)'
      });
    }
  };

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const dx = x - state.lastMouse.x;
    const dy = y - state.lastMouse.y;

    state.mouseVel.x = dx;
    state.mouseVel.y = dy;

    state.mouse.x = x;
    state.mouse.y = y;

    const speed = Math.min(2.2, Math.sqrt(dx * dx + dy * dy) / 18);
    spawn(x, y, speed);

    state.lastMouse.x = x;
    state.lastMouse.y = y;
  }, { passive: true });

  const draw = (t) => {
    state.raf = requestAnimationFrame(draw);

    const dt = t - state.last;
    state.last = t;

    ctx.clearRect(0, 0, state.w, state.h);

    // Draw points
    for (let i = state.points.length - 1; i >= 0; i--) {
      const p = state.points[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.life -= 1;

      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.c.replace(/0\.9\)$/, `${alpha.toFixed(3)})`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) state.points.splice(i, 1);
    }

    // Fade slightly for smoother look (very subtle)
    ctx.fillStyle = 'rgba(5,5,16,0.02)';
    ctx.fillRect(0, 0, state.w, state.h);
  };

  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(draw);

  return {
    dispose: () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', resize);
    }
  };
}

