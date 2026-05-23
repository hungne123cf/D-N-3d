/*
  three-scene.js
  - Initializes the full-page 3D galaxy scene
  - Includes: mouse parallax, custom text float (simple fallback), and ambient particles
  - Uses ES6 module pattern for integration into main.js
*/

let state = {
  renderer: null,
  scene: null,
  camera: null,
  raf: 0,
  particles: null,
  galaxy: null,
  cursor: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
  dpr: 1,
  mouseParallax: 0.85
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function createGalaxyParticles(count = 50000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  // Spiral arms galaxy
  const radius = 38;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Random point in spiral
    const arm = i % 5;
    const t = Math.random() * 1.0;
    const r = Math.pow(t, 0.55) * radius;
    const angle = arm * (Math.PI * 2) / 5 + t * (Math.PI * 10) + (Math.random() - 0.5) * 0.25;

    const x = Math.cos(angle) * r + (Math.random() - 0.5) * 0.6;
    const y = (Math.random() - 0.5) * 3.2;
    const z = Math.sin(angle) * r + (Math.random() - 0.5) * 0.6;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color('#00f5ff');
  const colorB = new THREE.Color('#bf00ff');
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const c = colorA.clone().lerp(colorB, t);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.09,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.y = Math.random() * Math.PI;
  return points;
}

function createHeroTextFallback() {
  // Fallback without TextGeometry (CDN modules not loaded). We'll use 2D canvas texture.
  const size = { w: 800, h: 200 };
  const canvas = document.createElement('canvas');
  canvas.width = size.w;
  canvas.height = size.h;
  const ctx = canvas.getContext('2d');

  // Background transparent
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Glow text
  ctx.font = 'bold 72px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const text = 'Trương Hùng';
  ctx.fillStyle = 'rgba(0,245,255,0.85)';
  ctx.shadowColor = 'rgba(0,245,255,0.8)';
  ctx.shadowBlur = 22;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  ctx.shadowBlur = 40;
  ctx.fillStyle = 'rgba(191,0,255,0.38)';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const geometry = new THREE.PlaneGeometry(12, 3);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 7.2, -18);
  return mesh;
}

function resize() {
  const { renderer, camera } = state;
  if (!renderer || !camera) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function animate() {
  state.raf = requestAnimationFrame(animate);
  const { renderer, scene, camera, particles } = state;

  // Smooth cursor -> target
  state.cursor.x += (state.target.x - state.cursor.x) * 0.05;
  state.cursor.y += (state.target.y - state.cursor.y) * 0.05;

  const mx = state.cursor.x;
  const my = state.cursor.y;

  if (camera) {
    camera.position.x = mx * 2.2;
    camera.position.y = my * 1.35;
    camera.lookAt(0, 0.8, 0);
  }

  if (particles) {
    particles.rotation.y += 0.0006;
    particles.rotation.x = my * 0.02;
    particles.material.opacity = 0.92;
  }

  if (state.galaxy) {
    // Slight pulsing
    const time = performance.now() * 0.0005;
    state.galaxy.position.y = 7.1 + Math.sin(time) * 0.25;
    state.galaxy.rotation.z = Math.sin(time * 1.6) * 0.03;
  }

  renderer.render(scene, camera);
}

export function initThreeScene({ containerCanvasId }) {
  const canvas = document.getElementById(containerCanvasId);
  if (!canvas) return;

  // Mobile performance: reduce particles
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const count = isMobile ? 5000 : 50000;

  state.dpr = Math.min(2, window.devicePixelRatio || 1);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(state.dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 1.5, 38);

  // Subtle fog / depth
  scene.fog = new THREE.FogExp2('#050510', 0.015);

  // Ambient
  const ambientLight = new THREE.AmbientLight(0x7f7fff, 0.35);
  scene.add(ambientLight);

  // Galaxy points
  const galaxy = createGalaxyParticles(count);
  state.particles = galaxy;
  scene.add(galaxy);
  state.galaxy = createHeroTextFallback();
  scene.add(state.galaxy);

  // Add slight dust ring
  const ringGeo = new THREE.RingGeometry(14, 18, 128);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, side: THREE.DoubleSide, transparent: true, opacity: 0.12 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 1;
  scene.add(ring);

  state.renderer = renderer;
  state.scene = scene;
  state.camera = camera;

  const onMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    state.target.x = clamp(x, -1, 1);
    state.target.y = clamp(y, -1, 1);
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('resize', resize);

  // Start loop
  resize();
  cancelAnimationFrame(state.raf);
  animate();

  return { dispose: () => cancelAnimationFrame(state.raf) };
}

