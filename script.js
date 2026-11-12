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


document.querySelector("#year").textContent =
  new Date().getFullYear();



/* ==========================================
   REVEAL ANIMATIONS
========================================== */

const revealObserver =
  new IntersectionObserver(
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


document
  .querySelectorAll(".reveal")
  .forEach((element, index) => {

    element.style.transitionDelay =
      `${Math.min(index % 4, 3) * 80}ms`;

    revealObserver.observe(element);

  });



/* ==========================================
   PROJECT CONTENT
========================================== */

const projectContent = {

  noru: {

    kicker:
      "02 / BRAND & VISUALS",

    title:
      "Norų Ūkis",

    description:
      "A visual storytelling concept for a hazelnut farm. Use this case study to show the real assets you created: social posts, product visuals, campaign concepts, photography or brand applications.",

    role:
      "ROLE: DESIGN / CONTENT",

    tools:
      "TOOLS: PHOTOSHOP / CANVA"

  },


  beach: {

    kicker:
      "03 / 3D ENVIRONMENT",

    title:
      "Somewhere in summer",

    description:
      "A stylised beach environment created to explore scene composition, lighting, imported 3D assets and sound. Replace this text with the final project brief and the specific technical decisions you made.",

    role:
      "ROLE: SCENE DESIGN / CODE",

    tools:
      "TOOLS: THREE.JS / GLTF"

  },


  photo: {

    kicker:
      "04 / PHOTOGRAPHY",

    title:
      "In the frame",

    description:
      "A curated photography selection. Replace the placeholder artwork with your strongest original photographs and group them into a clear visual story rather than a random image gallery.",

    role:
      "ROLE: PHOTOGRAPHY / EDITING",

    tools:
      "TOOLS: CAMERA / LIGHTROOM"

  }

};



/* ==========================================
   PROJECT DIALOG
========================================== */

const dialog =
  document.querySelector("#project-dialog");


document
  .querySelectorAll("[data-project]")
  .forEach(project => {

    project.addEventListener("click", event => {

      const projectName =
        project.dataset.project;



      /*
        Mechanical Keyboard is a real live
        project with its own URL.

        We DO NOT preventDefault here.
        The browser follows the href
        from index.html normally.
      */

      if (projectName === "keyboard") {

        return;

      }



      /*
        Other portfolio projects still
        use the existing dialog.
      */

      event.preventDefault();


      const item =
        projectContent[projectName];


      if (!item || !dialog) {

        return;

      }


      document.querySelector("#dialog-kicker")
        .textContent = item.kicker;


      document.querySelector("#dialog-title")
        .textContent = item.title;


      document.querySelector("#dialog-description")
        .textContent = item.description;


      document.querySelector("#dialog-role")
        .textContent = item.role;


      document.querySelector("#dialog-tools")
        .textContent = item.tools;


      dialog.showModal();

    });

  });



/* ==========================================
   CLOSE PROJECT DIALOG
========================================== */

document
  .querySelector(".dialog-close")
  ?.addEventListener(
    "click",
    () => dialog.close()
  );


dialog?.addEventListener(
  "click",
  event => {

    if (event.target === dialog) {

      dialog.close();

    }

  }
);



/* ==========================================
   BRANDED LOADER
========================================== */

(() => {

  const initLoader = () => {

    const loader =
      document.getElementById(
        "site-loader"
      );


    if (
      !loader ||
      loader.dataset.initialized === "true"
    ) {

      return;

    }


    loader.dataset.initialized =
      "true";


    const progressBar =
      document.getElementById(
        "loader-progress"
      );


    const percentLabel =
      document.getElementById(
        "loader-percent"
      );


    const startedAt =
      Date.now();


    let progress = 0;

    let done = false;



    const update = (n) => {

      progress =
        Math.max(
          progress,
          Math.min(100, n)
        );


      if (progressBar) {

        progressBar.style.width =
          progress + "%";

      }


      if (percentLabel) {

        percentLabel.textContent =
          String(
            Math.round(progress)
          ).padStart(2, "0") + "%";

      }

    };



    const reveal = () => {

      if (done) {

        return;

      }


      done = true;


      update(100);


      const minTimeLeft =
        Math.max(
          0,
          2400 -
          (Date.now() - startedAt)
        );


      window.setTimeout(() => {

        loader.classList.add(
          "is-hidden"
        );


        window.setTimeout(
          () => loader.remove(),
          600
        );

      }, minTimeLeft);

    };



    const timer =
      window.setInterval(() => {

        if (done) {

          window.clearInterval(
            timer
          );

          return;

        }


        update(
          progress < 65
            ? progress + 8
            : progress < 90
              ? progress + 3
              : progress + 1
        );

      }, 85);



    const tryReveal = () => {

      if (
        document.readyState === "complete"
      ) {

        const elapsed =
          Date.now() - startedAt;


        if (
          document.querySelector(
            "#hero-3d canvas"
          )

          ||

          elapsed > 2600
        ) {

          reveal();

        }

      }

    };



    if (
      document.readyState === "complete"
    ) {

      tryReveal();

    }


    window.addEventListener(
      "load",
      tryReveal,
      {
        once: true
      }
    );



    const hero =
      document.getElementById(
        "hero-3d"
      );


    if (hero) {

      const observer =
        new MutationObserver(
          tryReveal
        );


      observer.observe(
        hero,
        {
          childList: true,
          subtree: true
        }
      );


      window.setTimeout(
        () => observer.disconnect(),
        3000
      );

    }


    window.setTimeout(
      reveal,
      6500
    );

  };



  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initLoader,
      {
        once: true
      }
    );

  }

  else {

    initLoader();

  }

})();



/* ==========================================
   CONTACT FORM
========================================== */

(() => {

  const dialog =
    document.getElementById(
      "contact-form-dialog"
    );


  const openButton =
    document.getElementById(
      "open-contact-form"
    );


  const closeButton =
    document.getElementById(
      "close-contact-form"
    );


  const form =
    document.getElementById(
      "contact-form"
    );


  const status =
    document.getElementById(
      "contact-form-status"
    );


  if (
    !dialog ||
    !openButton ||
    !closeButton ||
    !form ||
    !status
  ) {

    return;

  }



  openButton.addEventListener(
    "click",
    event => {

      event.preventDefault();


      if (
        typeof dialog.showModal ===
        "function"
      ) {

        dialog.showModal();

      }

      else {

        window.location.hash =
          "contact-form-dialog";

      }

    }
  );



  closeButton.addEventListener(
    "click",
    () => dialog.close()
  );



  dialog.addEventListener(
    "click",
    event => {

      if (
        event.target === dialog
      ) {

        dialog.close();

      }

    }
  );



  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        dialog.open
      ) {

        dialog.close();

      }

    }
  );



  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!form.reportValidity()) {

        return;

      }


      if (
        form.elements["_honey"].value
      ) {

        return;

      }


      const submit =
        form.querySelector(
          "button[type='submit']"
        );


      const original =
        submit.innerHTML;


      submit.disabled =
        true;


      submit.textContent =
        "Sending…";


      status.textContent =
        "";


      status.classList.remove(
        "is-error"
      );



      try {

        const response =
          await fetch(
            form.action,
            {
              method: "POST",
              body: new FormData(form),
              headers: {
                Accept:
                  "application/json"
              }
            }
          );


        const result =
          await response
            .json()
            .catch(() => ({}));



        if (
          !response.ok ||
          result.success === "false" ||
          result.success === false
        ) {

          throw new Error(
            result.message ||
            "The message could not be sent. Please email me directly."
          );

        }



        status.textContent =
          "Thanks — your message has been sent. I’ll get back to you soon.";


        form.reset();

      }


      catch (error) {

        status.textContent =
          "Could not send right now. Please email tadas.dabkus@gmail.com instead.";


        status.classList.add(
          "is-error"
        );

      }


      finally {

        submit.disabled =
          false;


        submit.innerHTML =
          original;

      }

    }

  );

})();
