/*
  contact.js
  - Handles contact form validation + submission
  - Reads visitor count via REST and WebSocket (if backend supports)
*/

import { api } from './api.js';

function setError(fieldName, message) {
  const el = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (!el) return;
  el.textContent = message || '';
}

function validateForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());

  let ok = true;

  // name
  if (!data.name || data.name.trim().length < 2) {
    ok = false;
    setError('name', 'Please enter your name (min 2 characters).');
  } else setError('name', '');

  // email
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    ok = false;
    setError('email', 'Please enter a valid email.');
  } else setError('email', '');

  // subject
  if (!data.subject || data.subject.trim().length < 3) {
    ok = false;
    setError('subject', 'Subject must be at least 3 characters.');
  } else setError('subject', '');

  // message
  if (!data.message || data.message.trim().length < 10) {
    ok = false;
    setError('message', 'Message must be at least 10 characters.');
  } else setError('message', '');

  return { ok, data };
}

function initVisitorCounter() {
  const el = document.getElementById('visitorCount');
  const footerEl = document.getElementById('footerVisitorCount');

  if (!el && !footerEl) return;

  const apply = (count) => {
    const v = typeof count === 'number' ? count : 0;
    if (el) el.textContent = String(v);
    if (footerEl) footerEl.textContent = String(v);
  };

  api.getVisitorCount().then(apply).catch(() => apply(0));

  // WebSocket for realtime updates
  try {
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${scheme}://${window.location.host}/ws/visitor-count`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (typeof msg.count === 'number') apply(msg.count);
      } catch {
        // ignore
      }
    };
  } catch {
    // ignore
  }
}

function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('contactSubmitBtn');
  const status = document.getElementById('contactFormStatus');

  form.addEventListener('input', (e) => {
    const target = e.target;
    if (!(target && target.name)) return;

    if (target.name === 'name') setError('name', '');
    if (target.name === 'email') setError('email', '');
    if (target.name === 'subject') setError('subject', '');
    if (target.name === 'message') setError('message', '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!submitBtn || !status) return;

    const { ok, data } = validateForm(form);
    if (!ok) {
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';

    try {
      await api.submitContact(data);
      status.textContent = 'Message sent successfully. Rocket launch engaged 🚀';
      // Simple visual feedback; detailed 3D rocket is handled by the canvas renderer later.
      form.reset();
    } catch (err) {
      status.textContent = `Failed to send: ${err?.message || 'Unknown error'}`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function initContactScene() {
  const canvas = document.getElementById('contactCanvas');
  if (!canvas) return;

  // Lightweight decorative station (not full shader-heavy to keep initial build stable)
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#050510', 0.02);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);
  camera.position.set(0, 3, 13);

  const light = new THREE.PointLight(0x00f5ff, 1.1, 200);
  light.position.set(10, 6, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x7f7fff, 0.25));

  const station = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.2, 0.35, 130, 20),
    new THREE.MeshStandardMaterial({ color: 0xbf00ff, emissive: 0xbf00ff, emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.4 })
  );
  station.add(core);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.6, 2.5, 64),
    new THREE.MeshBasicMaterial({ color: 0x00f5ff, side: THREE.DoubleSide, transparent: true, opacity: 0.18 })
  );
  ring.rotation.x = -Math.PI / 2;
  station.add(ring);

  // small satellites
  for (let i = 0; i < 16; i++) {
    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(0.08 + Math.random() * 0.08, 10, 10),
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0x00f5ff : 0xff6b00, emissive: 0x00f5ff, emissiveIntensity: 0.18 })
    );
    sat.position.set(Math.cos(i) * 4.2, (Math.random() - 0.5) * 1.2, Math.sin(i) * 4.2);
    station.add(sat);
  }

  scene.add(station);

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  resize();
  window.addEventListener('resize', resize);

  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    station.rotation.y = t * 0.35;
    station.rotation.x = Math.sin(t * 0.6) * 0.08;
    renderer.render(scene, camera);
  };

  animate();

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
}

export function initContact() {
  initVisitorCounter();
  initForm();
  initContactScene();
}

