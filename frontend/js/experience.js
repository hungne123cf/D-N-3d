/*
  experience.js
  - Renders a lightweight 3D road animation using Three.js
  - Uses GSAP ScrollTrigger when available
*/

export function initExperience() {
  const canvas = document.getElementById('experienceCanvas');
  if (!canvas) return;

  // Basic three scene for performance.
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#050510', 0.02);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);
  camera.position.set(0, 2.5, 16);

  const light = new THREE.DirectionalLight(0xffffff, 0.65);
  light.position.set(5, 10, 8);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x7f7fff, 0.28));

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 200, 40, 200),
    new THREE.MeshStandardMaterial({ color: 0x060618, wireframe: false, metalness: 0.2, roughness: 0.9 })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.y = -1.1;
  scene.add(road);

  const milestones = [];
  const milestoneGeo = new THREE.CylinderGeometry(0.25, 0.45, 2.0, 16);
  const milestoneMat = new THREE.MeshStandardMaterial({ color: 0x00f5ff, emissive: 0x00f5ff, emissiveIntensity: 0.35 });
  for (let i = 0; i < 8; i++) {
    const m = new THREE.Mesh(milestoneGeo, milestoneMat.clone());
    m.position.set((Math.random() - 0.5) * 6, -0.1, -i * 22 - 10);
    m.userData.baseX = m.position.x;
    m.userData.baseZ = m.position.z;
    scene.add(m);
    milestones.push(m);
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = 620; // align with CSS height
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener('resize', resize);

  let raf = 0;
  const trail = [];

  const animate = () => {
    raf = requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // Road wave
    road.geometry.vertices?.forEach?.(() => {});
    const pos = road.geometry.attributes.position;
    const count = pos.count;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = Math.sin(time * 1.2 + z * 0.09) * 0.015;
      pos.setY(i, y - 1.1);
    }
    pos.needsUpdate = true;

    // Milestones bob
    milestones.forEach((m, idx) => {
      m.position.x = m.userData.baseX + Math.sin(time * 1.6 + idx) * 0.08;
      m.position.y = -0.1 + Math.cos(time * 1.2 + idx) * 0.05;
    });

    renderer.render(scene, camera);
  };

  cancelAnimationFrame(raf);
  animate();

  // ScrollTrigger control
  try {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.to(camera.position, {
        scrollTrigger: {
          trigger: canvas,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: true
        },
        z: -60,
        x: 1.5,
        y: 4.0,
        ease: 'none'
      });
    }
  } catch {
    // ignore
  }

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    }
  };
}

