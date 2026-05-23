/*
  skills-scene.js
  - Creates a Three.js "solar system" style skills scene
  - Click planets to reveal skill tooltip states
  - This is a lightweight placeholder implementation to keep initial run stable
*/

export function initSkillsScene() {
  const canvas = document.getElementById('skillsCanvas');
  if (!canvas) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // Uses global THREE from CDN
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#050510', 0.03);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 6, 20);

  const light = new THREE.PointLight(0x00f5ff, 1.2, 120);
  light.position.set(0, 0, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xbf00ff, 0.18));

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff6b00, emissive: 0xff6b00, emissiveIntensity: 0.8 })
  );
  scene.add(sun);

  const tooltip = document.getElementById('skillsTooltip');

  const planetDefs = [
    { label: 'Development', color: '#00f5ff', orbit: 4.2, speed: 0.45 },
    { label: 'Database', color: '#2cff7d', orbit: 6.3, speed: 0.28 },
    { label: 'Documentation', color: '#bf00ff', orbit: 8.2, speed: 0.22 }
  ];

  const planets = planetDefs.map((d, idx) => {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 28, 28),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(d.color), emissive: new THREE.Color(d.color), emissiveIntensity: 0.25 })
    );
    p.position.set(d.orbit, 0, 0);
    p.userData = { ...d, index: idx };
    scene.add(p);
    return p;
  });

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(planets);
    if (!hits.length) return;

    const p = hits[0].object;
    const d = p.userData;

    if (tooltip) {
      tooltip.classList.add('is-active');
      tooltip.textContent = `Category: ${d.label} — click again to explore skills (coming soon).`;
      setTimeout(() => tooltip.classList.remove('is-active'), 700);
    }
  };

  canvas.addEventListener('click', onClick);

  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = performance.now() * 0.001;

    sun.rotation.y += 0.01;

    planets.forEach((p) => {
      const d = p.userData;
      const a = t * d.speed;
      p.position.set(Math.cos(a) * d.orbit, Math.sin(t * 0.8) * 0.5, Math.sin(a) * d.orbit);
      p.rotation.y += 0.015;
      p.rotation.x += 0.005;
    });

    renderer.render(scene, camera);
  };

  animate();

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', onClick);
      renderer.dispose();
    }
  };
}

