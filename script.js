/* =========================================================
   NAVIGATION
========================================================= */

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



/* =========================================================
   YEAR
========================================================= */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}



/* =========================================================
   SCROLL REVEALS
========================================================= */

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



/* =========================================================
   PROJECT DATA
========================================================= */

const projectContent = {

  autumn: {

    kicker: "01 / CREATIVE TECHNOLOGY",

    title: "Autumn worlds",

    description:
      "An exploration of atmosphere and material in a real-time 3D environment. The project focuses on an autumn setting, environment lighting, surface textures and the relationship between detail and mood.",

    role:
      "ROLE: 3D SCENE / DEVELOPMENT",

    tools:
      "TOOLS: THREE.JS / WEBGPU",

    gallery: [],

    reminder:
      "A real-time 3D environment exploring atmosphere, materials and interactive presentation."

  },


  /* =====================================================
     VLTN
  ===================================================== */

  vltn: {

    kicker: "02 / BRAND & DIGITAL",

    title: "VLTN",

    description:
      "A fictional performance brand identity and digital experience concept. The project combines visual identity, art direction, product presentation and a responsive website built around a premium performance aesthetic.",

    role:
      "ROLE: BRAND IDENTITY / ART DIRECTION",

    tools:
      "TOOLS: FIGMA / PHOTOSHOP / HTML / CSS / JS",

    gallery: [

      {
        src: "vltn/vltn-board-01.jpg",
        alt: "VLTN brand identity board 01"
      },

      {
        src: "vltn/vltn-board-02.jpg",
        alt: "VLTN brand identity board 02"
      },

      {
        src: "vltn/vltn-board-03.jpg",
        alt: "VLTN brand identity board 03"
      }

    ],

    website: {

      image: "vltn/vltn-website.jpg",

      title: "VISIT THE VLTN WEBSITE",

      url: "https://tadasdabkus.github.io/vltn-performance/"

    },

    reminder:
      "The project explores how a fictional performance brand can move from identity and visual direction into a complete digital experience."

  },


  /* =====================================================
     BEACH
  ===================================================== */

  beach: {

    kicker: "03 / 3D ENVIRONMENT",

    title: "Somewhere in summer",

    description:
      "A stylised beach environment created to explore scene composition, lighting, imported 3D assets and sound.",

    role:
      "ROLE: SCENE DESIGN / CODE",

    tools:
      "TOOLS: THREE.JS / GLTF",

    gallery: [],

    reminder:
      "A stylised 3D environment exploring composition, lighting, assets and sound."

  },


  /* =====================================================
     PHOTOGRAPHY
  ===================================================== */

  photo: {

    kicker: "04 / PHOTOGRAPHY",

    title: "In the frame",

    description:
      "A curated photography selection focused on observation, light and composition.",

    role:
      "ROLE: PHOTOGRAPHY / EDITING",

    tools:
      "TOOLS: CAMERA / LIGHTROOM",

    gallery: [],

    reminder:
      "A selection of original photography focused on observation, light and composition."

  }

};



/* =========================================================
   PROJECT DIALOG
========================================================= */

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

const dialogReminder =
  document.querySelector("#dialog-reminder");



/* =========================================================
   OPEN PROJECT
========================================================= */

document
  .querySelectorAll("[data-project]")
  .forEach(project => {

    project.addEventListener("click", event => {

      event.preventDefault();

      const item =
        projectContent[project.dataset.project];

      if (!item || !dialog) {
        return;
      }


      /* BASIC INFO */

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

      dialogReminder.textContent =
        item.reminder;


      /* =================================================
         CLEAR OLD GALLERY
      ================================================= */

      dialogGallery.innerHTML = "";


      /* =================================================
         CREATE GALLERY
      ================================================= */

      if (item.gallery && item.gallery.length) {

        const galleryTitle =
          document.createElement("p");

        galleryTitle.className =
          "dialog-gallery-label mono";

        galleryTitle.textContent =
          "SELECTED VISUALS";

        dialogGallery.appendChild(
          galleryTitle
        );


        item.gallery.forEach(image => {

          const imageWrapper =
            document.createElement("div");

          imageWrapper.className =
            "dialog-gallery-item";


          const img =
            document.createElement("img");

          img.src = image.src;

          img.alt = image.alt;

          img.loading = "lazy";


          imageWrapper.appendChild(img);

          dialogGallery.appendChild(
            imageWrapper
          );

        });

      }


      /* =================================================
         WEBSITE IMAGE / LINK
      ================================================= */

      if (item.website) {

        const websiteBlock =
          document.createElement("div");

        websiteBlock.className =
          "dialog-website";


        const websiteLabel =
          document.createElement("p");

        websiteLabel.className =
          "dialog-gallery-label mono";

        websiteLabel.textContent =
          item.website.title;


        const websiteLink =
          document.createElement("a");

        websiteLink.href =
          item.website.url;

        websiteLink.target =
          "_blank";

        websiteLink.rel =
          "noopener noreferrer";

        websiteLink.className =
          "dialog-website-link";


        const websiteImage =
          document.createElement("img");

        websiteImage.src =
          item.website.image;

        websiteImage.alt =
          "VLTN website preview";


        const websiteOverlay =
          document.createElement("span");

        websiteOverlay.className =
          "dialog-website-overlay";

        websiteOverlay.innerHTML =
          "OPEN WEBSITE ↗";


        websiteLink.appendChild(
          websiteImage
        );

        websiteLink.appendChild(
          websiteOverlay
        );


        websiteBlock.appendChild(
          websiteLabel
        );

        websiteBlock.appendChild(
          websiteLink
        );

        dialogGallery.appendChild(
          websiteBlock
        );

      }


      /* =================================================
         OPEN
      ================================================= */

      dialog.showModal();

    });

  });



/* =========================================================
   CLOSE PROJECT DIALOG
========================================================= */

const closeProjectDialog =
  document.querySelector(
    "#close-project-dialog"
  );

closeProjectDialog?.addEventListener(
  "click",
  () => {

    dialog?.close();

  }
);



/* Close when clicking backdrop */

dialog?.addEventListener(
  "click",
  event => {

    if (event.target === dialog) {

      dialog.close();

    }

  }
);



/* =========================================================
   CONTACT FORM DIALOG
========================================================= */

const contactDialog =
  document.querySelector(
    "#contact-form-dialog"
  );

const openContactForm =
  document.querySelector(
    "#open-contact-form"
  );

const closeContactForm =
  document.querySelector(
    "#close-contact-form"
  );


openContactForm?.addEventListener(
  "click",
  event => {

    event.preventDefault();

    contactDialog?.showModal();

  }
);


closeContactForm?.addEventListener(
  "click",
  () => {

    contactDialog?.close();

  }
);


contactDialog?.addEventListener(
  "click",
  event => {

    if (event.target === contactDialog) {

      contactDialog.close();

    }

  }
);



/* =========================================================
   CONTACT FORM SUBMISSION
========================================================= */

const contactForm =
  document.querySelector(
    "#contact-form"
  );

const contactStatus =
  document.querySelector(
    "#contact-form-status"
  );


contactForm?.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const submitButton =
      contactForm.querySelector(
        ".contact-form-submit"
      );


    if (submitButton) {

      submitButton.disabled = true;

      submitButton.innerHTML =
        "Sending... <span>↗</span>";

    }


    contactStatus.textContent = "";

    contactStatus.classList.remove(
      "is-error"
    );


    try {

      const response =
        await fetch(
          contactForm.action,
          {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
              "Accept": "application/json"
            }
          }
        );


      if (!response.ok) {

        throw new Error(
          "Message could not be sent."
        );

      }


      contactStatus.textContent =
        "Message sent successfully.";

      contactForm.reset();


      if (submitButton) {

        submitButton.innerHTML =
          "Message sent <span>✓</span>";

      }


    } catch (error) {

      contactStatus.textContent =
        "Something went wrong. Please email me directly.";

      contactStatus.classList.add(
        "is-error"
      );


      if (submitButton) {

        submitButton.disabled = false;

        submitButton.innerHTML =
          "Send message <span>↗</span>";

      }

    }

  }
);



/* =========================================================
   BRANDED LOADER
========================================================= */

const loader =
  document.querySelector("#site-loader");

const loaderPercent =
  document.querySelector("#loader-percent");

const loaderProgress =
  document.querySelector("#loader-progress");


let loaderValue = 0;


function updateLoader(value) {

  loaderValue =
    Math.min(100, Math.round(value));


  if (loaderPercent) {

    loaderPercent.textContent =
      `${String(loaderValue).padStart(2, "0")}%`;

  }


  if (loaderProgress) {

    loaderProgress.style.width =
      `${loaderValue}%`;

  }

}


function hideLoader() {

  if (!loader) {
    return;
  }


  updateLoader(100);


  setTimeout(() => {

    loader.classList.add(
      "is-hidden"
    );

  }, 350);

}


function runLoader() {

  let value = 0;

  const interval =
    setInterval(() => {

      value +=
        Math.random() * 12 + 4;

      if (value >= 92) {

        value = 92;

        clearInterval(interval);

      }

      updateLoader(value);

    }, 100);


  window.addEventListener(
    "load",
    () => {

      updateLoader(100);

      setTimeout(
        hideLoader,
        450
      );

    },
    {
      once: true
    }
  );


  /* Safety fallback */

  setTimeout(
    hideLoader,
    2500
  );

}


runLoader();
