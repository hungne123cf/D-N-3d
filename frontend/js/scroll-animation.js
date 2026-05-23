/*
  scroll-animation.js
  - Sets up GSAP ScrollTrigger-based motion
  - Keeps 60fps by limiting heavy calculations and using RAF-friendly updates
*/

export function initScrollAnimations() {
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (!hasGSAP) return;

  try {
    window.gsap.registerPlugin(window.ScrollTrigger);
  } catch {
    // ignore
  }

  const bgCanvas = document.getElementById('bgCanvas');
  if (bgCanvas) {
    // Gentle zoom-in as user scrolls
    window.gsap.to(bgCanvas, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      },
      scale: 1.04,
      opacity: 1
    });
  }

  // Timeline/cards animation hooks
  const elems = Array.from(document.querySelectorAll('[data-aos]'));
  // If AOS is present it handles it; GSAP fallback is not necessary.

  // Experience canvas a little parallax
  const expCanvas = document.getElementById('experienceCanvas');
  if (expCanvas) {
    window.gsap.to(expCanvas, {
      scrollTrigger: {
        trigger: expCanvas,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      },
      y: 30,
      ease: 'none'
    });
  }
}

