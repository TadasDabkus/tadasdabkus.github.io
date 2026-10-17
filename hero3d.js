import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const host = document.querySelector("#hero-3d");

if (host) {
  try {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(Math.max(host.clientWidth, 1), Math.max(host.clientHeight, 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute("aria-label", "Drag to rotate the 3D object");
    renderer.domElement.setAttribute("role", "img");
    host.appendChild(renderer.domElement);

    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    const coreGeometry = new THREE.TorusKnotGeometry(1.0, 0.29, 200, 28, 2, 5);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xd5ff3f,
      metalness: 0.62,
      roughness: 0.22,
      emissive: 0x344900,
      emissiveIntensity: 0.45
    });
    objectGroup.add(new THREE.Mesh(coreGeometry, coreMaterial));

    const ringGeometryA = new THREE.TorusGeometry(1.58, 0.018, 8, 160);
    const ringMaterialA = new THREE.MeshStandardMaterial({
      color: 0xff6845, metalness: 0.6, roughness: 0.26,
      emissive: 0x3a1005, emissiveIntensity: 0.3
    });
    const ringA = new THREE.Mesh(ringGeometryA, ringMaterialA);
    ringA.rotation.set(0.9, 0.3, -0.35);
    objectGroup.add(ringA);

    const ringGeometryB = new THREE.TorusGeometry(1.38, 0.012, 8, 144);
    const ringMaterialB = new THREE.MeshStandardMaterial({
      color: 0xf1efe9, metalness: 0.35, roughness: 0.42
    });
    const ringB = new THREE.Mesh(ringGeometryB, ringMaterialB);
    ringB.rotation.set(-0.75, 0.55, 0.7);
    objectGroup.add(ringB);

    const beadGeometry = new THREE.IcosahedronGeometry(0.075, 1);
    const beadMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1efe9, metalness: 0.45, roughness: 0.22
    });
    const bead = new THREE.Mesh(beadGeometry, beadMaterial);
    bead.position.set(1.72, 0.55, 0.15);
    objectGroup.add(bead);

    scene.add(new THREE.AmbientLight(0xf1efe9, 1.45));
    const keyLight = new THREE.PointLight(0xd5ff3f, 45, 15);
    keyLight.position.set(3, 2.5, 4);
    scene.add(keyLight);
    const warmLight = new THREE.PointLight(0xff6845, 32, 12);
    warmLight.position.set(-3, -1.8, 2.5);
    scene.add(warmLight);
    const rimLight = new THREE.PointLight(0xffffff, 20, 10);
    rimLight.position.set(0, 3.5, -2);
    scene.add(rimLight);

    // Lightweight pointer controls: no OrbitControls module dependency.
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    const onPointerDown = (event) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      host.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      objectGroup.rotation.y += dx * 0.008;
      objectGroup.rotation.x += dy * 0.008;
      velocityY = dx * 0.0008;
      velocityX = dy * 0.0008;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = () => { dragging = false; };
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.addEventListener("lostpointercapture", onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
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
      if (!dragging && !reduceMotion) {
        objectGroup.rotation.y += 0.002 + velocityY;
        objectGroup.rotation.x += Math.sin(t * 0.45) * 0.0007 + velocityX;
        velocityX *= 0.94;
        velocityY *= 0.94;
      }
      bead.rotation.x += 0.008;
      bead.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("pagehide", () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      coreGeometry.dispose(); coreMaterial.dispose();
      ringGeometryA.dispose(); ringMaterialA.dispose();
      ringGeometryB.dispose(); ringMaterialB.dispose();
      beadGeometry.dispose(); beadMaterial.dispose();
      renderer.dispose();
    }, { once: true });
  } catch (error) {
    console.error("3D hero failed to initialize:", error);
    host.innerHTML = '<div class="hero-3d-fallback">3D OBJECT<br><span>INTERACTIVE STUDY / 01</span></div>';
  }
}
