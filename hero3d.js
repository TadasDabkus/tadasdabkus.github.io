import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

const host = document.querySelector("#hero-3d");

if (host && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute("aria-label", "Drag to rotate the 3D object");
  renderer.domElement.setAttribute("role", "img");
  host.appendChild(renderer.domElement);

  const objectGroup = new THREE.Group();
  scene.add(objectGroup);

  const coreGeometry = new THREE.TorusKnotGeometry(1.05, 0.31, 180, 24, 2, 5);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0xd5ff3f,
    metalness: 0.72,
    roughness: 0.24,
    emissive: 0x273500,
    emissiveIntensity: 0.35
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  objectGroup.add(core);

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6845,
    metalness: 0.65,
    roughness: 0.28,
    emissive: 0x381006,
    emissiveIntensity: 0.35
  });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.018, 8, 160), ringMaterial);
  ringA.rotation.set(1.0, 0.3, -0.3);
  objectGroup.add(ringA);

  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(1.48, 0.012, 8, 140),
    new THREE.MeshStandardMaterial({ color: 0xf1efe9, metalness: 0.45, roughness: 0.5 })
  );
  ringB.rotation.set(-0.8, 0.55, 0.8);
  objectGroup.add(ringB);

  const beadGeometry = new THREE.IcosahedronGeometry(0.075, 1);
  const beadMaterial = new THREE.MeshStandardMaterial({
    color: 0xf1efe9,
    metalness: 0.4,
    roughness: 0.25
  });
  const bead = new THREE.Mesh(beadGeometry, beadMaterial);
  bead.position.set(1.9, 0.72, 0.15);
  objectGroup.add(bead);

  scene.add(new THREE.AmbientLight(0xf1efe9, 1.15));

  const keyLight = new THREE.PointLight(0xd5ff3f, 35, 15);
  keyLight.position.set(3.5, 2.5, 4);
  scene.add(keyLight);

  const warmLight = new THREE.PointLight(0xff6845, 30, 12);
  warmLight.position.set(-3, -1.8, 2.5);
  scene.add(warmLight);

  const rimLight = new THREE.PointLight(0xffffff, 18, 10);
  rimLight.position.set(0, 3.5, -2);
  scene.add(rimLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.minDistance = 5.4;
  controls.maxDistance = 9;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.55;
  controls.target.set(0, 0, 0);

  let width = host.clientWidth;
  let height = host.clientHeight;
  const resizeObserver = new ResizeObserver(() => {
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  resizeObserver.observe(host);

  const clock = new THREE.Clock();
  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (!controls.enabled) return;
    if (!controls.state || controls.state === -1) {
      objectGroup.rotation.y += 0.0018;
      objectGroup.rotation.x = Math.sin(t * 0.24) * 0.08;
    }
    bead.rotation.x += 0.008;
    bead.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("pagehide", () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    controls.dispose();
    coreGeometry.dispose();
    coreMaterial.dispose();
    ringA.geometry.dispose();
    ringMaterial.dispose();
    ringB.geometry.dispose();
    ringB.material.dispose();
    beadGeometry.dispose();
    beadMaterial.dispose();
    renderer.dispose();
  }, { once: true });
} else if (host) {
  host.style.background = "radial-gradient(circle at 50% 50%, rgba(213,255,63,.12), transparent 60%)";
  host.setAttribute("aria-label", "Reduced motion enabled. Interactive 3D animation is disabled.");
}
