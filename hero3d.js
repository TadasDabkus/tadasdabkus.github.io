import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const host = document.querySelector("#hero-3d");

if (host) {
  try {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(Math.max(host.clientWidth, 1), Math.max(host.clientHeight, 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.domElement.setAttribute("aria-label", "Drag to rotate the geometric 3D sculpture");
    renderer.domElement.setAttribute("role", "img");
    host.appendChild(renderer.domElement);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    // Main architectural form: a faceted, slightly softened icosahedron.
    const coreGeometry = new THREE.IcosahedronGeometry(1.18, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9ed35,
      metalness: 0.48,
      roughness: 0.3,
      flatShading: true,
      emissive: 0x172500,
      emissiveIntensity: 0.32
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculpture.add(core);

    // Fine technical cage around the core.
    const cageGeometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.22, 1));
    const cageMaterial = new THREE.LineBasicMaterial({
      color: 0xf1efe9,
      transparent: true,
      opacity: 0.7
    });
    const cage = new THREE.LineSegments(cageGeometry, cageMaterial);
    sculpture.add(cage);

    // Offset geometric frame — orange as a small accent, not a dominant loop.
    const frameGeometry = new THREE.OctahedronGeometry(1.62, 0);
    const frameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6845,
      wireframe: true,
      transparent: true,
      opacity: 0.92
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.rotation.set(0.38, 0.2, 0.58);
    sculpture.add(frame);

    // A second, finer offset frame adds depth and an engineered feel.
    const innerFrameGeometry = new THREE.TetrahedronGeometry(1.48, 0);
    const innerFrameMaterial = new THREE.MeshBasicMaterial({
      color: 0xf1efe9,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const innerFrame = new THREE.Mesh(innerFrameGeometry, innerFrameMaterial);
    innerFrame.rotation.set(-0.4, 0.72, 0.18);
    sculpture.add(innerFrame);

    // Small marker nodes on the structure.
    const nodeGeometry = new THREE.SphereGeometry(0.055, 12, 10);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1efe9,
      metalness: 0.25,
      roughness: 0.25,
      emissive: 0x383838,
      emissiveIntensity: 0.25
    });
    const nodePositions = [
      [1.6, 0.42, 0.3],
      [-1.18, 0.9, -0.2],
      [0.25, -1.55, 0.15]
    ];
    nodePositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      sculpture.add(node);
    });

    scene.add(new THREE.AmbientLight(0xf1efe9, 1.35));
    const keyLight = new THREE.PointLight(0xd5ff3f, 32, 14);
    keyLight.position.set(2.8, 2.4, 4);
    scene.add(keyLight);
    const warmLight = new THREE.PointLight(0xff6845, 14, 12);
    warmLight.position.set(-3, -1.7, 2.8);
    scene.add(warmLight);
    const rimLight = new THREE.PointLight(0xffffff, 20, 10);
    rimLight.position.set(0, 3.2, -2.4);
    scene.add(rimLight);

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const startDrag = (x, y) => {
      dragging = true;
      lastX = x;
      lastY = y;
      renderer.domElement.classList.add("is-dragging");
    };
    const moveDrag = (x, y) => {
      if (!dragging) return;
      const dx = x - lastX;
      const dy = y - lastY;
      sculpture.rotation.y += dx * 0.012;
      sculpture.rotation.x += dy * 0.012;
      velocityY = dx * 0.0008;
      velocityX = dy * 0.0008;
      lastX = x;
      lastY = y;
    };
    const stopDrag = () => {
      dragging = false;
      renderer.domElement.classList.remove("is-dragging");
    };

    // Pointer events for mouse and modern touch browsers.
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.pointerEvents = "auto";
    renderer.domElement.style.userSelect = "none";
    renderer.domElement.style.webkitUserSelect = "none";
    renderer.domElement.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      startDrag(event.clientX, event.clientY);
      try { renderer.domElement.setPointerCapture(event.pointerId); } catch (_) {}
    });
    renderer.domElement.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      event.preventDefault();
      moveDrag(event.clientX, event.clientY);
    });
    renderer.domElement.addEventListener("pointerup", stopDrag);
    renderer.domElement.addEventListener("pointercancel", stopDrag);
    renderer.domElement.addEventListener("lostpointercapture", stopDrag);

    // Explicit touch listeners as a fallback for mobile Chrome/WebView.
    renderer.domElement.addEventListener("touchstart", (event) => {
      if (!event.changedTouches.length) return;
      event.preventDefault();
      const touch = event.changedTouches[0];
      startDrag(touch.clientX, touch.clientY);
    }, { passive: false });
    renderer.domElement.addEventListener("touchmove", (event) => {
      if (!dragging || !event.changedTouches.length) return;
      event.preventDefault();
      const touch = event.changedTouches[0];
      moveDrag(touch.clientX, touch.clientY);
    }, { passive: false });
    renderer.domElement.addEventListener("touchend", stopDrag, { passive: true });
    renderer.domElement.addEventListener("touchcancel", stopDrag, { passive: true });

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
        sculpture.rotation.y += 0.0012 + velocityY;
        sculpture.rotation.x += Math.sin(t * 0.3) * 0.0005 + velocityX;
        velocityX *= 0.94;
        velocityY *= 0.94;
      }
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("pagehide", () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      coreGeometry.dispose(); coreMaterial.dispose();
      cageGeometry.dispose(); cageMaterial.dispose();
      frameGeometry.dispose(); frameMaterial.dispose();
      innerFrameGeometry.dispose(); innerFrameMaterial.dispose();
      nodeGeometry.dispose(); nodeMaterial.dispose();
      renderer.dispose();
    }, { once: true });
  } catch (error) {
    console.error("3D hero failed to initialize:", error);
    host.innerHTML = '<div class="hero-3d-fallback">GEOMETRIC STUDY<br><span>INTERACTIVE OBJECT / 01</span></div>';
  }
}
