/* ==========================================
   MOBILE NAVIGATION
========================================== */

const nav = document.querySelector(".desktop-nav");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


nav?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});



/* ==========================================
   YEAR
========================================== */

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}



/* ==========================================
   SCROLL REVEAL
========================================== */

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document.querySelectorAll(".reveal").forEach(
  (element, index) => {

    element.style.transitionDelay =
      `${Math.min(index % 4, 3) * 80}ms`;

    revealObserver.observe(element);

  }
);



/* ==========================================
   PROJECT CONTENT
========================================== */

const projectContent = {

  vltn: {

    kicker: "02 / BRAND & DIGITAL",

    title: "VLTN",

    description:
      "A fictional performance brand identity and digital experience built around running, training and recovery. The project explores visual identity, art direction, product presentation and responsive web design.",

    role:
      "ROLE: BRAND IDENTITY / WEB DESIGN",

    tools:
      "TOOLS: FIGMA / PHOTOSHOP / HTML / CSS / JS",

    gallery: true

  },


  beach: {

    kicker: "03 / 3D ENVIRONMENT",

    title: "Somewhere in summer",

    description:
      "A stylised beach environment created to explore scene composition, lighting, imported 3D assets and sound.",

    role:
      "ROLE: SCENE DESIGN / CODE",

    tools:
      "TOOLS: THREE.JS / GLTF",

    gallery: false

  },


  photo: {

    kicker: "04 / PHOTOGRAPHY",

    title: "In the frame",

    description:
      "A curated photography selection exploring observation, light, composition and visual storytelling.",

    role:
      "ROLE: PHOTOGRAPHY / EDITING",

    tools:
      "TOOLS: CAMERA / LIGHTROOM",

    gallery: false

  }

};



/* ==========================================
   PROJECT DIALOG
========================================== */

const dialog = document.querySelector("#project-dialog");

const dialogKicker =
  document.querySelector("#dialog-kicker");

const dialogTitle =
  document.querySelector("#dialog-title");

const dialogDescription =
  document.querySelector("#dialog-description");

const dialogRole =
  document.querySelector("#dialog-role");

const dialogTools =
  document.querySelector("#dialog-tools");

const dialogGallery =
  document.querySelector("#dialog-gallery");



/* ==========================================
   OPEN PROJECTS
========================================== */

document.querySelectorAll("[data-project]").forEach(project => {

  project.addEventListener("click", event => {

    /*
      Mechanical Keyboard does NOT have data-project,
      so this handler will never intercept it.

      It therefore goes directly to:
      https://tadasdabkus.github.io/interactive-mechanical-keyboard/
    */

    const projectId =
      project.dataset.project;

    const item =
      projectContent[projectId];

    if (!item || !dialog) {
      return;
    }

    event.preventDefault();


    /* ---------------------------------------
       TEXT
    --------------------------------------- */

    dialogKicker.textContent =
      item.kicker;

    dialogTitle.textContent =
      item.title;

    dialogDescription.textContent =
      item.description;

    dialogRole.textContent =
      item.role;

    dialogTools.textContent =
      item.tools;



    /* ---------------------------------------
       VLTN GALLERY
    --------------------------------------- */

    if (item.gallery) {

      dialogGallery.classList.add("is-visible");


      const board01 =
        document.querySelector("#gallery-board-01");

      const board02 =
        document.querySelector("#gallery-board-02");

      const board03 =
        document.querySelector("#gallery-board-03");

      const websiteImage =
        document.querySelector("#gallery-website");

      const websiteLink =
        document.querySelector("#gallery-website-link");


      board01.src =
        "vltn/vltn-board-01.jpg";

      board02.src =
        "vltn/vltn-board-02.jpg";

      board03.src =
        "vltn/vltn-board-03.jpg";

      websiteImage.src =
        "vltn/vltn-website.jpg";


      websiteLink.href =
        "https://tadasdabkus.github.io/vltn-performance/";

    }

    else {

      dialogGallery.classList.remove("is-visible");

    }


    dialog.showModal();

  });

});



/* ==========================================
   CLOSE DIALOG
========================================== */

document
  .querySelector(".dialog-close")
  ?.addEventListener("click", () => {

    dialog?.close();

  });



/* ==========================================
   CLOSE WHEN CLICKING BACKDROP
========================================== */

dialog?.addEventListener("click", event => {

  if (event.target === dialog) {

    dialog.close();

  }

});



/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    dialog?.open
  ) {

    dialog.close();

  }

});
