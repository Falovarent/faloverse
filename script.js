/* =================================
   ELEMENTS
================================= */

const cursor =
    document.querySelector(".cursor");

const normalWord =
    document.querySelector(".word-base");

const distortedWord =
    document.querySelector(".word-distorted");


/* =================================
   MOUSE
================================= */

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let currentX =
    mouseX;

let currentY =
    mouseY;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


/* =================================
   GLITCH SETTINGS
================================= */

/*
   Size of the invisible circle.
*/

const GLITCH_RADIUS = 115;


/*
   How much the word is distorted
   INSIDE the circle.
*/

const DISTORTION = 18;


/* =================================
   ANIMATION
================================= */

function animate() {

    /* ===============================
       SMOOTH DOT
    =============================== */

    currentX +=
        (mouseX - currentX) *
        0.18;

    currentY +=
        (mouseY - currentY) *
        0.18;


    /* ===============================
       MOVE RED DOT
    =============================== */

    cursor.style.left =
        currentX + "px";

    cursor.style.top =
        currentY + "px";


    /* ===============================
       MOVE GLITCH CIRCLE
    =============================== */

    distortedWord.style.clipPath = `

        circle(
            ${GLITCH_RADIUS}px
            at
            ${currentX}px
            ${currentY}px
        )

    `;


    /* ===============================
       STATIC GLITCH DISTORTION
    =============================== */

    /*
       The word itself does NOT move.

       Instead, the distorted copy is
       shifted slightly underneath the
       circular mask.

       This makes the circle look like
       a corrupted section of reality.
    */

    const distortionX =
        Math.sin(
            currentY * 0.035
        ) * DISTORTION;

    const distortionY =
        Math.cos(
            currentX * 0.025
        ) * 5;


    distortedWord.style.transform = `

        translate(
            ${distortionX}px,
            ${distortionY}px
        )

    `;


    /* ===============================
       GLITCH FILTER
    =============================== */

    /*
       Subtle contrast/brightness
       changes make the circle darker.
    */

    const pulse =
        Math.sin(
            performance.now() * 0.008
        );


    distortedWord.style.filter = `

        contrast(${1.35 + pulse * 0.12})

        brightness(${0.65 + pulse * 0.05})

    `;


    /* ===============================
       DOT
    =============================== */

    cursor.style.boxShadow = `

        0 0 7px
        rgba(255,0,0,1),

        0 0 18px
        rgba(180,0,0,0.85),

        0 0 45px
        rgba(80,0,0,0.6)

    `;


    requestAnimationFrame(
        animate
    );

}


animate();


/* =================================
   PAGE NAVIGATION
================================= */

function goTo(pageId) {

    document
        .querySelectorAll(".page")
        .forEach((page) => {

            page.classList.remove(
                "active"
            );

        });


    const target =
        document.getElementById(
            pageId
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }

}
