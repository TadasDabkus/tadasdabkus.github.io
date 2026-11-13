/* Tadas Dabkus portfolio — interaction layer */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* ---------------- Mobile navigation ---------------- */
  const menuToggle = $(".menu-toggle");
  const desktopNav = $(".desktop-nav");

  if (menuToggle && desktopNav) {
    menuToggle.addEventListener("click", () => {
      const open = desktopNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    desktopNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        desktopNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Year ---------------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------- Scroll reveals ---------------- */
  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  /* ---------------- Project details ---------------- */
  const projectContent = {
    keyboard: {
      kicker: "01 / CREATIVE TECHNOLOGY",
      title: "Mechanical Keyboard",
      description:
        "An interactive 3D product experience built from a Blender model and brought to the browser with Three.js and WebGPU. Keys respond to mouse interaction and physical keyboard input, with smooth key movement, hover feedback and sound.",
      role: "ROLE: 3D / WEB / INTERACTION",
      tools: "TOOLS: BLENDER / THREE.JS / WEBGPU",
      reminder: "A product-style web experiment focused on 3D interaction, responsive presentation and translating a physical object into a browser experience.",
      link: "https://tadasdabkus.github.io/interactive-mechanical-keyboard/",
      linkLabel: "Open interactive keyboard",
      gallery: []
    },

    vltn: {
      kicker: "02 / BRAND & DIGITAL",
      title: "VLTN",
      description:
        "A fictional performance brand identity and digital experience concept. The project explores a complete visual system across identity, apparel, campaign imagery, product presentation and a responsive website.",
      role: "ROLE: BRAND / ART DIRECTION / WEB",
      tools: "TOOLS: FIGMA / PHOTOSHOP / HTML / CSS / JS",
      reminder: "VLTN is an independent fictional brand concept created as a digital design project. The case study combines visual identity, campaign direction and a working website.",
      link: "https://tadasdabkus.github.io/vltn-performance/",
      linkLabel: "Open VLTN website",
      gallery: [
        { src: "vltn/vltn-board-01.jpg", alt: "VLTN brand board 01", caption: "BRAND BOARD / 01" },
        { src: "vltn/vltn-board-02.jpg", alt: "VLTN brand board 02", caption: "BRAND BOARD / 02" },
        { src: "vltn/vltn-board-03.jpg", alt: "VLTN brand board 03", caption: "BRAND BOARD / 03" },
        { src: "vltn/vltn-website.jpg", alt: "VLTN website preview", caption: "DIGITAL EXPERIENCE / WEBSITE" , link: "https://tadasdabkus.github.io/vltn-performance/" }
      ]
    },

    beach: {
      kicker: "03 / 3D ENVIRONMENT",
      title: "Somewhere in summer",
      description:
        "A stylised 3D environment exploring composition, lighting, sound and atmosphere in a real-time scene.",
      role: "ROLE: 3D / SCENE DESIGN",
      tools: "TOOLS: THREE.JS / WEBGPU",
      reminder: "An interactive environment study developed as part of the 3D and graphics work.",
      gallery: []
    },

    photo: {
      kicker: "04 / PHOTOGRAPHY",
      title: "In the frame",
      description:
        "A selection of photographic work focused on observation, light, framing and visual storytelling.",
      role: "ROLE: PHOTOGRAPHY / EDITING",
      tools: "TOOLS: CAMERA / LIGHTROOM / PHOTOSHOP",
      reminder: "Selected visual stories and photographic experiments.",
      gallery: []
    }
  };

  const projectDialog = $("#project-dialog");
  const dialogClose = projectDialog ? $(".dialog-close", projectDialog) : null;
  const dialogKicker = $("#dialog-kicker");
  const dialogTitle = $("#dialog-title");
  const dialogDescription = $("#dialog-description");
  const dialogRole = $("#dialog-role");
  const dialogTools = $("#dialog-tools");
  const dialogGallery = $("#dialog-gallery");
  const dialogLink = $("#dialog-project-link");
  const dialogReminder = $("#dialog-reminder");

  function renderGallery(items) {
    if (!dialogGallery) return;
    dialogGallery.innerHTML = "";

    if (!items || !items.length) {
      dialogGallery.hidden = true;
      return;
    }

    dialogGallery.hidden = false;

    items.forEach(item => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || "Project visual";
      image.loading = "lazy";

      if (item.link) {
        const link = document.createElement("a");
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.appendChild(image);
        figure.appendChild(link);
      } else {
        figure.appendChild(image);
      }

      if (item.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = item.caption;
        figure.appendChild(caption);
      }

      dialogGallery.appendChild(figure);
    });
  }

  function openProject(key) {
    const data = projectContent[key];
    if (!data || !projectDialog) return;

    if (dialogKicker) dialogKicker.textContent = data.kicker || "PROJECT / DETAILS";
    if (dialogTitle) dialogTitle.textContent = data.title || "Project";
    if (dialogDescription) dialogDescription.textContent = data.description || "";
    if (dialogRole) dialogRole.textContent = data.role || "";
    if (dialogTools) dialogTools.textContent = data.tools || "";
    if (dialogReminder) dialogReminder.textContent = data.reminder || "";

    renderGallery(data.gallery);

    if (dialogLink) {
      if (data.link) {
        dialogLink.hidden = false;
        dialogLink.href = data.link;
        dialogLink.textContent = "";
        const label = document.createElement("span");
        label.textContent = data.linkLabel || "Open project website";
        const arrow = document.createElement("span");
        arrow.textContent = "↗";
        dialogLink.append(label, arrow);
      } else {
        dialogLink.hidden = true;
        dialogLink.removeAttribute("href");
      }
    }

    if (typeof projectDialog.showModal === "function") {
      projectDialog.showModal();
    } else {
      projectDialog.setAttribute("open", "");
    }
  }

  function closeProject() {
    if (!projectDialog) return;
    if (typeof projectDialog.close === "function") projectDialog.close();
    else projectDialog.removeAttribute("open");
  }

  $$(".project[data-project]").forEach(project => {
    project.addEventListener("click", event => {
      event.preventDefault();
      openProject(project.dataset.project);
    });
  });

  if (dialogClose) dialogClose.addEventListener("click", closeProject);

  if (projectDialog) {
    projectDialog.addEventListener("click", event => {
      if (event.target === projectDialog) closeProject();
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && projectDialog?.open) closeProject();
  });

  /* ---------------- Branded loader ---------------- */
  const loader = $("#site-loader");
  const loaderPercent = $("#loader-percent");
  const loaderProgress = $("#loader-progress");

  function setLoaderProgress(value) {
    const rounded = Math.max(0, Math.min(100, Math.round(value)));
    if (loaderPercent) loaderPercent.textContent = String(rounded).padStart(2, "0") + "%";
    if (loaderProgress) loaderProgress.style.width = rounded + "%";
  }

  function finishLoader() {
    setLoaderProgress(100);
    window.setTimeout(() => loader?.classList.add("is-hidden"), 220);
  }

  if (loader) {
    let progress = 0;
    const progressTimer = window.setInterval(() => {
      progress += Math.random() * 7 + 2;
      if (progress >= 88) {
        progress = 88;
        window.clearInterval(progressTimer);
      }
      setLoaderProgress(progress);
    }, 80);

    const finish = () => {
      window.clearInterval(progressTimer);
      finishLoader();
    };

    if (document.readyState === "complete") {
      window.setTimeout(finish, 250);
    } else {
      window.addEventListener("load", () => window.setTimeout(finish, 250), { once: true });
    }
  }

  /* ---------------- Contact form ---------------- */
  const contactDialog = $("#contact-form-dialog");
  const openContact = $("#open-contact-form");
  const closeContact = $("#close-contact-form");
  const contactForm = $("#contact-form");
  const contactStatus = $("#contact-form-status");

  function openContactDialog(event) {
    event?.preventDefault();
    if (!contactDialog) return;
    if (typeof contactDialog.showModal === "function") contactDialog.showModal();
    else contactDialog.setAttribute("open", "");
  }

  function closeContactDialog() {
    if (!contactDialog) return;
    if (typeof contactDialog.close === "function") contactDialog.close();
    else contactDialog.removeAttribute("open");
  }

  openContact?.addEventListener("click", openContactDialog);
  closeContact?.addEventListener("click", closeContactDialog);

  contactDialog?.addEventListener("click", event => {
    if (event.target === contactDialog) closeContactDialog();
  });

  contactForm?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!contactStatus) return;

    const submitButton = $(".contact-form-submit", contactForm);
    if (submitButton) submitButton.disabled = true;
    contactStatus.classList.remove("is-error");
    contactStatus.textContent = "Sending…";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Request failed");

      contactStatus.textContent = "Message sent. Thank you!";
      contactForm.reset();
    } catch (error) {
      contactStatus.classList.add("is-error");
      contactStatus.textContent = "Something went wrong. Please email me directly.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
})();
