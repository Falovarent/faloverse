/* =================================
   ELEMENTS
================================= */

const cursor =
    document.querySelector(".cursor");

const letters =
    document.querySelectorAll(".letter");


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
   LETTER DATA
================================= */

const letterData = [];


function setupLetters() {

    letterData.length = 0;


    letters.forEach((letter) => {

        /*
         * Remove the old distortion
         * before measuring the letter.
         */

        letter.style.transform =
            "none";


        const rect =
            letter.getBoundingClientRect();


        letterData.push({

            element: letter,

            x:
                rect.left +
                rect.width / 2,

            y:
                rect.top +
                rect.height / 2,

            width:
                rect.width,

            height:
                rect.height,

            currentX: 0,

            currentY: 0,

            currentRotate: 0,

            currentScaleX: 1,

            currentScaleY: 1

        });

    });

}


/* =================================
   INITIALIZE
================================= */

setupLetters();


window.addEventListener(
    "resize",
    setupLetters
);


/* =================================
   ANIMATION
================================= */

function animate() {


    /* --------------------------------
       SMOOTH CURSOR
    -------------------------------- */

    currentX +=
        (mouseX - currentX) *
        0.18;


    currentY +=
        (mouseY - currentY) *
        0.18;


    /* --------------------------------
       CURSOR POSITION
    -------------------------------- */

    cursor.style.left =
        currentX + "px";

    cursor.style.top =
        currentY + "px";


    /* --------------------------------
       CLOSEST LETTER
    -------------------------------- */

    let closestStrength = 0;


    /* =================================
       EACH LETTER
    ================================= */

    letterData.forEach((data) => {

        const letter =
            data.element;


        /* --------------------------------
           DISTANCE
        -------------------------------- */

        const dx =
            currentX - data.x;


        const dy =
            currentY - data.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* --------------------------------
           DISTORTION AREA
        -------------------------------- */

        const radius = 230;


        let strength =
            1 -
            distance / radius;


        strength =
            Math.max(
                0,
                Math.min(
                    1,
                    strength
                )
            );


        /*
         * Make the distortion
         * stronger near the dot.
         */

        strength =
            strength * strength;


        /* --------------------------------
           KEEP TRACK OF CLOSEST LETTER
        -------------------------------- */

        closestStrength =
            Math.max(
                closestStrength,
                strength
            );


        /* =================================
           DISTORTION
        ================================= */

        /*
         * Stretch sideways.
         */

        const targetScaleX =
            1 +
            strength * 0.75;


        /*
         * Slight vertical compression.
         */

        const targetScaleY =
            1 -
            strength * 0.22;


        /*
         * Local movement.

         * The letter bends around
         * the red point instead of
         * simply moving away.
         */

        const targetX =
            dx *
            strength *
            -0.10;


        const targetY =
            dy *
            strength *
            -0.04;


        /*
         * Rotation.
         */

        const targetRotate =
            dx *
            strength *
            0.055;


        /* =================================
           SMOOTH MOVEMENT
        ================================= */

        data.currentX +=
            (
                targetX -
                data.currentX
            ) * 0.15;


        data.currentY +=
            (
                targetY -
                data.currentY
            ) * 0.15;


        data.currentRotate +=
            (
                targetRotate -
                data.currentRotate
            ) * 0.15;


        data.currentScaleX +=
            (
                targetScaleX -
                data.currentScaleX
            ) * 0.15;


        data.currentScaleY +=
            (
                targetScaleY -
                data.currentScaleY
            ) * 0.15;


        /* =================================
           APPLY DISTORTION
        ================================= */

        letter.style.transform = `

            translate3d(
                ${data.currentX}px,
                ${data.currentY}px,
                0
            )

            rotate(
                ${data.currentRotate}deg
            )

            scaleX(
                ${data.currentScaleX}
            )

            scaleY(
                ${data.currentScaleY}
            )

        `;


        /* =================================
           LETTER GLOW
        ================================= */

        const glow =
            strength * 35;


        letter.style.filter = `

            drop-shadow(
                0 0 ${glow}px
                rgba(
                    255,
                    0,
                    20,
                    ${strength * 0.4}
                )
            )

        `;

    });


    /* =================================
       RED DOT
    ================================= */

    const cursorSize =
        18 +
        closestStrength * 14;


    cursor.style.width =
        cursorSize + "px";


    cursor.style.height =
        cursorSize + "px";


    cursor.style.boxShadow = `

        0 0
        ${10 + closestStrength * 15}px
        rgba(255,20,20,1),

        0 0
        ${30 + closestStrength * 35}px
        rgba(255,20,20,0.8),

        0 0
        ${60 + closestStrength * 60}px
        rgba(255,20,20,0.4)

    `;


    /* =================================
       NEXT FRAME
    ================================= */

    requestAnimationFrame(
        animate
    );

}


/* =================================
   START
================================= */

animate();


/* =================================
   PAGE NAVIGATION
================================= */

function goTo(pageId) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach((page) => {

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
