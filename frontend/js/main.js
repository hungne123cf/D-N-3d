/*
  main.js
  - Entry point for frontend interactive journey
  - Initializes smooth scrolling, navigation, loading screen dissolve,
    AOS, and bootstraps feature modules.
*/

import { initThreeScene } from './three-scene.js';
import { initParticles } from './particles.js';
import { initCursor } from './cursor.js';
import { initScrollAnimations } from './scroll-animation.js';
import { initSkillChartAndFetch } from './skill-chart.js';
import { initProjects } from './projects.js';
import { initExperience } from './experience.js';
import { initContact } from './contact.js';
import { initSkillsScene } from './skills-scene.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function getRandomQuote() {
  const quotes = [
    'Compiling stardust…',
    'Optimizing pipelines…',
    'Spinning up microservices…',
    'Connecting galaxies…',
    'Rendering WebGL…',
    'Caching the future…'
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function initLoadingScreen() {
  const loading = $('#loadingScreen');
  const canvas = $('#loadingCanvas');
  const progressBar = $('#loadingProgressBar');
  const quoteEl = $('#loadingQuote');

  if (!loading || !canvas || !progressBar || !quoteEl) return;

  // Minimal 2s experience for a nice reveal.
  const start = performance.now();
  const duration = 2200;

  quoteEl.textContent = getRandomQuote();

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  function resize() {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  const particles = new Array(140)
    .fill(0)
    .map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007
    }));

  let raf = 0;
  const loop = (t) => {
    const elapsed = t - start;
    const p = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    progressBar.style.width = `${Math.floor(eased * 100)}%`;

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (const pt of particles) {
        pt.x += pt.vx;
        pt.y += pt.vy;

        const cx = canvas.width * 0.5 + (pt.x - 0.5) * canvas.width * 0.7;
        const cy = canvas.height * 0.52 + (pt.y - 0.5) * canvas.height * 0.45;
        const size = pt.r * dpr * (0.7 + eased * 1.4);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 2);
        grad.addColorStop(0, 'rgba(0,245,255,0.9)');
        grad.addColorStop(0.5, 'rgba(191,0,255,0.45)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    if (p < 1) {
      raf = requestAnimationFrame(loop);
    } else {
      // Dissolve into hero
      loading.classList.add('is-dissolving');
      setTimeout(() => {
        loading.classList.add('is-hidden');
        cancelAnimationFrame(raf);
      }, 520);
    }
  };

  raf = requestAnimationFrame(loop);
}

function initScrollProgress() {
  const bar = $('#scrollProgressBar');
  if (!bar) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const v = max <= 0 ? 0 : (doc.scrollTop / max) * 100;
      bar.style.width = `${Math.max(0, Math.min(100, v))}%`;
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initSmoothScrolling() {
  // Lenis handles ultra smooth scrolling.
  try {
    if (window.Lenis) {
      const lenis = new window.Lenis({
        lerp: 0.09,
        smoothWheel: true,
        smoothTouch: false
      });
      function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } catch {
    // Fallback silently.
  }
}

function initAnchorNavigation() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initAOS() {
  try {
    if (window.AOS) {
      window.AOS.init({ duration: 900, once: true });
    }
  } catch {
    // ignore
  }
}

function initMagneticSocialLinks() {
  // Magnetic hover effect for social links.
  const links = $$('.social-link');
  if (!links.length) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  window.addEventListener('mousemove', onMove, { passive: true });

  const strength = 0.14;
  links.forEach((el) => {
    el.style.willChange = 'transform';
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 160ms ease';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 220ms ease';
      el.style.transform = 'translate3d(0,0,0)';
    });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    });
  });
}

// IntersectionObserver helper to animate-in sections
function initIntersectionAnimations() {
  const candidates = $$('[data-aos]');
  if (candidates.length) return; // AOS handles it

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 }
  );

  candidates.forEach((el) => observer.observe(el));
}

function init() {
  initLoadingScreen();
  initScrollProgress();
  initSmoothScrolling();
  initAnchorNavigation();
  initAOS();
  initIntersectionAnimations();
  initMagneticSocialLinks();

  initThreeScene({ containerCanvasId: 'bgCanvas' });
  initParticles({ canvasId: 'bgCanvas' });
  initCursor({ cursorElId: 'cursor' });
  initScrollAnimations();

  initSkillChartAndFetch();
  initSkillsScene();
  initProjects();
  initExperience();
  initContact();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

