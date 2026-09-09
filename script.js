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

            currentX: 0,

            currentY: 0,

            currentRotate: 0,

            currentScaleX: 1,

            currentScaleY: 1

        });

    });

}


setupLetters();

window.addEventListener(
    "resize",
    setupLetters
);


/* =================================
   ANIMATION
================================= */

function animate() {


    /* ===============================
       SMOOTH CURSOR
    =============================== */

    currentX +=
        (mouseX - currentX) *
        0.18;

    currentY +=
        (mouseY - currentY) *
        0.18;


    cursor.style.left =
        currentX + "px";

    cursor.style.top =
        currentY + "px";


    let strongest =
        0;


    /* ===============================
       LETTER DISTORTION
    =============================== */

    letterData.forEach((data) => {

        const letter =
            data.element;


        const dx =
            currentX - data.x;

        const dy =
            currentY - data.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /*
         * Smaller radius makes
         * distortion feel concentrated.
         */

        const radius = 180;


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
         * Sharper falloff.
         */

        strength =
            Math.pow(
                strength,
                2.5
            );


        strongest =
            Math.max(
                strongest,
                strength
            );


        /* ===========================
           DARK WARP
        =========================== */


        /*
         * Stretch horizontally.
         *
         * Creates the feeling that
         * the letter is being pulled
         * through a dimensional tear.
         */

        const targetScaleX =
            1 +
            strength * 0.85;


        /*
         * Compress vertically.
         */

        const targetScaleY =
            1 -
            strength * 0.30;


        /*
         * Strong local displacement.
         */

        const targetX =
            dx *
            strength *
            -0.16;


        const targetY =
            dy *
            strength *
            -0.08;


        /*
         * Twisting.
         */

        const targetRotate =
            dx *
            strength *
            0.07;


        /* ===========================
           SMOOTHING
        =========================== */

        data.currentX +=
            (
                targetX -
                data.currentX
            ) * 0.13;


        data.currentY +=
            (
                targetY -
                data.currentY
            ) * 0.13;


        data.currentRotate +=
            (
                targetRotate -
                data.currentRotate
            ) * 0.13;


        data.currentScaleX +=
            (
                targetScaleX -
                data.currentScaleX
            ) * 0.13;


        data.currentScaleY +=
            (
                targetScaleY -
                data.currentScaleY
            ) * 0.13;


        /* ===========================
           APPLY
        =========================== */

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


        /* ===========================
           DARK RED DISTORTION
        =========================== */

        if (strength > 0) {

            const red =
                strength * 0.35;

            const blur =
                strength * 18;


            letter.style.filter = `

                drop-shadow(
                    0 0 ${blur}px
                    rgba(
                        120,
                        0,
                        5,
                        ${red}
                    )
                )

            `;

        } else {

            letter.style.filter =
                "none";

        }

    });


    /* ===============================
       RED DOT
    =============================== */

    const size =
        15 +
        strongest * 10;


    cursor.style.width =
        size + "px";

    cursor.style.height =
        size + "px";


    /*
     * When touching a letter,
     * the red point becomes more
     * intense.
     */

    cursor.style.boxShadow = `

        0 0
        ${5 + strongest * 8}px
        rgba(255,0,0,1),

        0 0
        ${15 + strongest * 20}px
        rgba(180,0,0,0.9),

        0 0
        ${35 + strongest * 40}px
        rgba(100,0,0,0.7),

        0 0
        ${70 + strongest * 70}px
        rgba(40,0,0,0.5)

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


    const page =
        document.getElementById(
            pageId
        );


    if (page) {

        page.classList.add(
            "active"
        );

    }

}
