const nav = document.querySelector(".desktop-nav");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(element);
});

const projectContent = {
  autumn: {
    kicker: "01 / CREATIVE TECHNOLOGY",
    title: "Autumn worlds",
    description: "An exploration of atmosphere and material in a real-time 3D environment. The project focuses on an autumn setting, environment lighting, surface textures and the relationship between detail and mood.",
    role: "ROLE: 3D SCENE / DEVELOPMENT",
    tools: "TOOLS: THREE.JS / WEBGPU"
  },
  noru: {
    kicker: "02 / BRAND & VISUALS",
    title: "Norų Ūkis",
    description: "A visual storytelling concept for a hazelnut farm. Use this case study to show the real assets you created: social posts, product visuals, campaign concepts, photography or brand applications.",
    role: "ROLE: DESIGN / CONTENT",
    tools: "TOOLS: PHOTOSHOP / CANVA"
  },
  beach: {
    kicker: "03 / 3D ENVIRONMENT",
    title: "Somewhere in summer",
    description: "A stylised beach environment created to explore scene composition, lighting, imported 3D assets and sound. Replace this text with the final project brief and the specific technical decisions you made.",
    role: "ROLE: SCENE DESIGN / CODE",
    tools: "TOOLS: THREE.JS / GLTF"
  },
  photo: {
    kicker: "04 / PHOTOGRAPHY",
    title: "In the frame",
    description: "A curated photography selection. Replace the placeholder artwork with your strongest original photographs and group them into a clear visual story rather than a random image gallery.",
    role: "ROLE: PHOTOGRAPHY / EDITING",
    tools: "TOOLS: CAMERA / LIGHTROOM"
  }
};

const dialog = document.querySelector("#project-dialog");
document.querySelectorAll("[data-project]").forEach(project => {
  project.addEventListener("click", event => {
    event.preventDefault();
    const item = projectContent[project.dataset.project];
    if (!item || !dialog) return;
    document.querySelector("#dialog-kicker").textContent = item.kicker;
    document.querySelector("#dialog-title").textContent = item.title;
    document.querySelector("#dialog-description").textContent = item.description;
    document.querySelector("#dialog-role").textContent = item.role;
    document.querySelector("#dialog-tools").textContent = item.tools;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});


// Branded loader: wait for page assets and the 3D canvas to initialize, with a safety timeout.
(() => {
  const loader = document.getElementById("site-loader");
  if (!loader) return;

  const progressBar = document.getElementById("loader-progress");
  const percentLabel = document.getElementById("loader-percent");
  let progress = 0;
  let finished = false;
  const startedAt = Date.now();
  const minDisplayMs = 650;
  const maxWaitMs = 4500;

  const setProgress = (value) => {
    progress = Math.max(progress, Math.min(100, value));
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentLabel) percentLabel.textContent = `${String(Math.round(progress)).padStart(2, "0")}%`;
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    setProgress(100);
    const delay = Math.max(0, minDisplayMs - (Date.now() - startedAt));
    window.setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.classList.add("site-loaded");
      window.setTimeout(() => loader.remove(), 550);
    }, delay);
  };

  // Smooth visual progress; it is a presentation indicator, not a byte-accurate download meter.
  const progressTimer = window.setInterval(() => {
    if (finished) {
      window.clearInterval(progressTimer);
      return;
    }
    const next = progress < 60 ? progress + 9 : progress < 85 ? progress + 3 : progress + 1;
    setProgress(Math.min(next, 94));
  }, 90);

  const checkReady = () => {
    const canvas = document.querySelector("#hero-3d canvas");
    // If WebGL is unsupported or the CDN is unavailable, don't block the rest of the site.
    const has3d = Boolean(canvas);
    const pageReady = document.readyState === "complete";
    if (pageReady && (has3d || Date.now() - startedAt > 1800)) finish();
  };

  if (document.readyState === "complete") {
    checkReady();
  } else {
    window.addEventListener("load", checkReady, { once: true });
  }

  const observer = new MutationObserver(() => checkReady());
  const hero = document.getElementById("hero-3d");
  if (hero) observer.observe(hero, { childList: true, subtree: true });

  window.setTimeout(() => {
    observer.disconnect();
    finish();
  }, maxWaitMs);
})();
