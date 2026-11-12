/* =========================================================
   TADZAKI / LAB — PORTFOLIO SCRIPT
   ========================================================= */


/* =========================================================
   BRANDED PAGE LOADER
   ========================================================= */

(function initSiteLoader() {

    const loader = document.getElementById("site-loader");
    const percent = document.getElementById("loader-percent");
    const progress = document.getElementById("loader-progress");

    // Jeigu loaderio HTML nėra — nieko nedarome
    if (!loader) return;

    let currentProgress = 0;
    let finished = false;


    function updateLoader(value) {

        currentProgress = Math.min(100, Math.max(0, value));

        if (percent) {
            percent.textContent =
                `${String(Math.round(currentProgress)).padStart(2, "0")}%`;
        }

        if (progress) {
            progress.style.width = `${currentProgress}%`;
        }
    }


    function finishLoader() {

        if (finished) return;

        finished = true;

        updateLoader(100);

        setTimeout(() => {

            loader.classList.add("is-hidden");

            setTimeout(() => {

                if (loader && loader.parentNode) {
                    loader.remove();
                }

            }, 600);

        }, 250);
    }


    // Pradinė būsena
    updateLoader(0);


    // Lengva progreso animacija
    setTimeout(() => updateLoader(20), 100);
    setTimeout(() => updateLoader(40), 250);
    setTimeout(() => updateLoader(65), 450);
    setTimeout(() => updateLoader(80), 650);


    // Kai visas puslapis užsikrovė
    if (document.readyState === "complete") {

        setTimeout(finishLoader, 300);

    } else {

        window.addEventListener(
            "load",
            () => {
                setTimeout(finishLoader, 300);
            },
            { once: true }
        );

    }


    // Saugiklis — loaderis niekada negali likti amžinai
    setTimeout(() => {
        finishLoader();
    }, 3000);

})();



/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const desktopNav = document.querySelector(".desktop-nav");


if (menuToggle && desktopNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            desktopNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    desktopNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            desktopNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}



/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element, index) => {

        // Nedidelis stagger efektas
        const delay =
            Math.min(index % 4, 3) * 80;

        element.style.transitionDelay =
            `${delay}ms`;

        revealObserver.observe(element);

    });

} else {

    // Fallback senesnėms naršyklėms
    revealElements.forEach(element => {

        element.classList.add(
            "is-visible"
        );

    });

}



/* =========================================================
   PROJECT CONTENT
   ========================================================= */

const projectContent = {

    autumn: {

        kicker: "01 / REAL-TIME 3D",

        title: "Autumn worlds",

        description:
            "An experimental real-time 3D environment exploring atmosphere, materials, lighting and interaction through a stylised autumn scene.",

        role:
            "ROLE: 3D SCENE / DEVELOPMENT",

        tools:
            "TOOLS: THREE.JS / WEBGPU / BLENDER"

    },


    noru: {

        kicker: "02 / BRAND & DIGITAL",

        title: "Norų Ūkis",

        description:
            "A visual and digital concept created for a hazelnut farm, combining web design, visual communication and content direction.",

        role:
            "ROLE: DESIGN / WEB",

        tools:
            "TOOLS: FIGMA / FRAMER / PHOTOSHOP"

    },


    beach: {

        kicker: "03 / REAL-TIME 3D",

        title: "Somewhere in summer",

        description:
            "A stylised interactive beach environment created with 3D assets, lighting, textures, animation and sound.",

        role:
            "ROLE: 3D / DEVELOPMENT",

        tools:
            "TOOLS: THREE.JS / WEBGPU / GLTF"

    },


    photo: {

        kicker: "04 / PHOTOGRAPHY",

        title: "In the frame",

        description:
            "A curated photography project focused on composition, atmosphere, detail and visual storytelling.",

        role:
            "ROLE: PHOTOGRAPHY / EDITING",

        tools:
            "TOOLS: CAMERA / LIGHTROOM"

    }

};



/* =========================================================
   PROJECT DIALOG
   ========================================================= */

const projectDialog =
    document.querySelector("#project-dialog");


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


const dialogClose =
    document.querySelector(".dialog-close");



/* =========================================================
   PROJECT CLICK HANDLING
   ========================================================= */

document
    .querySelectorAll("[data-project]")
    .forEach(project => {

        project.addEventListener("click", event => {

            const projectName =
                project.dataset.project;


            /*
             * Mechanical Keyboard
             *
             * Šis projektas turi būti atskira nuoroda,
             * todėl jo dialogas neatidaromas.
             */

            if (projectName === "keyboard") {

                return;

            }


            const content =
                projectContent[projectName];


            if (!content || !projectDialog) {

                return;

            }


            event.preventDefault();


            if (dialogKicker) {

                dialogKicker.textContent =
                    content.kicker;

            }


            if (dialogTitle) {

                dialogTitle.textContent =
                    content.title;

            }


            if (dialogDescription) {

                dialogDescription.textContent =
                    content.description;

            }


            if (dialogRole) {

                dialogRole.textContent =
                    content.role;

            }


            if (dialogTools) {

                dialogTools.textContent =
                    content.tools;

            }


            projectDialog.showModal();

        });

    });



/* =========================================================
   CLOSE PROJECT DIALOG
   ========================================================= */

if (dialogClose && projectDialog) {

    dialogClose.addEventListener(
        "click",
        () => {
            projectDialog.close();
        }
    );

}


if (projectDialog) {

    projectDialog.addEventListener(
        "click",
        event => {

            // Paspaudus už dialogo ribų
            if (event.target === projectDialog) {

                projectDialog.close();

            }

        }
    );


    // ESC taip pat uždaro dialogą
    projectDialog.addEventListener(
        "cancel",
        () => {

            projectDialog.close();

        }
    );

}



/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.querySelector("#contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "SENDING...";

            }


            try {

                const formData =
                    new FormData(contactForm);


                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed."
                    );

                }


                contactForm.reset();


                if (submitButton) {

                    submitButton.textContent =
                        "SENT";

                }


                setTimeout(() => {

                    if (submitButton) {

                        submitButton.textContent =
                            originalButtonText;

                        submitButton.disabled =
                            false;

                    }

                }, 2500);


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (submitButton) {

                    submitButton.textContent =
                        "ERROR";

                }


                setTimeout(() => {

                    if (submitButton) {

                        submitButton.textContent =
                            originalButtonText;

                        submitButton.disabled =
                            false;

                    }

                }, 2500);

            }

        }
    );

}



/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



/* =========================================================
   END
   ========================================================= */
