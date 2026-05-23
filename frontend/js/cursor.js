/*
  cursor.js
  - Custom cursor that reacts to hoverable links
  - Uses the DOM cursor element created in index.html
*/

export function initCursor({ cursorElId }) {
  const cursorEl = document.getElementById(cursorElId);
  if (!cursorEl) return;

  const links = Array.from(document.querySelectorAll('a, button, .social-link'));

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    cursorEl.style.transform = `translate3d(${mx}px, ${my}px, 0) translate3d(-50%, -50%, 0)`;
  };

  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
  };

  const setHover = (isHover) => {
    cursorEl.style.transition = 'transform 120ms ease, width 120ms ease, height 120ms ease';
    if (isHover) {
      cursorEl.style.width = '38px';
      cursorEl.style.height = '38px';
      cursorEl.style.boxShadow = '0 0 34px rgba(0,245,255,0.55), 0 0 42px rgba(191,0,255,0.25)';
      cursorEl.style.border = '1px solid rgba(191,0,255,0.35)';
    } else {
      cursorEl.style.width = '14px';
      cursorEl.style.height = '14px';
      cursorEl.style.boxShadow = '0 0 22px rgba(0,245,255,0.55)';
      cursorEl.style.border = '0';
    }
  };

  document.addEventListener('mousemove', onMove, { passive: true });
  for (const el of links) {
    el.addEventListener('mouseenter', () => setHover(true));
    el.addEventListener('mouseleave', () => setHover(false));
  }

  cancelAnimationFrame(raf);
  animate();

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
    }
  };
}

