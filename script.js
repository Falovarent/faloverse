/* =================================
   ELEMENTS
================================= */

const cursor = document.querySelector(".cursor");
const letters = document.querySelectorAll(".letter");


/* =================================
   MOUSE
================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


/* =================================
   GLITCH STATE
================================= */

const letterData = [];


document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});


/* =================================
   SETUP LETTERS
================================= */

function setupLetters() {

    letterData.length = 0;

    letters.forEach((letter) => {

        letter.style.transform = "none";

        const rect = letter.getBoundingClientRect();

        letterData.push({

            element: letter,

            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,

            currentX: 0,
            currentY: 0,

            rotation: 0,

            glitchX: 0,
            glitchY: 0,

            scaleX: 1,
            scaleY: 1,

            glitchTimer: 0,

            glitchPower: 0

        });

    });
}


setupLetters();

window.addEventListener("resize", setupLetters);


/* =================================
   RANDOM GLITCH
================================= */

function createGlitch(data, strength) {

    /*
     * Random horizontal corruption
     */

    data.glitchX =
        (Math.random() - 0.5)
        * 80
        * strength;


    /*
     * Tiny vertical jump
     */

    data.glitchY =
        (Math.random() - 0.5)
        * 18
        * strength;


    /*
     * Sudden rotation
     */

    data.rotation =
        (Math.random() - 0.5)
        * 12
        * strength;


    /*
     * Uneven stretching
     */

    data.scaleX =
        1 +
        (Math.random() - 0.5)
        * 0.45
        * strength;


    data.scaleY =
        1 +
        (Math.random() - 0.5)
        * 0.18
        * strength;


    /*
     * How long the glitch survives
     */

    data.glitchTimer =
        Math.random() * 5 + 2;

}


/* =================================
   ANIMATION
================================= */

function animate() {

    /* ===============================
       SMOOTH CURSOR
    =============================== */

    currentX +=
        (mouseX - currentX) * 0.2;

    currentY +=
        (mouseY - currentY) * 0.2;


    cursor.style.left =
        currentX + "px";

    cursor.style.top =
        currentY + "px";


    let strongest = 0;


    /* ===============================
       LETTERS
    =============================== */

    letterData.forEach((data) => {

        const letter = data.element;


        /* ---------------------------
           DISTANCE
        --------------------------- */

        const dx =
            currentX - data.x;

        const dy =
            currentY - data.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* ---------------------------
           GLITCH RANGE
        --------------------------- */

        const radius = 190;


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
         * Make it sharply localized.
         */

        strength =
            Math.pow(
                strength,
                2
            );


        strongest =
            Math.max(
                strongest,
                strength
            );


        /* ===========================
           GLITCH TRIGGER
        =========================== */

        if (strength > 0.25) {

            data.glitchTimer--;

            /*
             * Randomly trigger
             * tiny corruption bursts.
             */

            if (
                data.glitchTimer <= 0 &&
                Math.random() < 0.35
            ) {

                createGlitch(
                    data,
                    strength
                );

            }

        } else {

            data.glitchTimer = 0;

        }


        /* ===========================
           DECAY GLITCH
        =========================== */

        data.glitchX *= 0.72;

        data.glitchY *= 0.72;

        data.rotation *= 0.72;


        /* ===========================
           BASE DISTORTION
        =========================== */

        /*
         * Slight local bending.
         */

        const baseX =
            dx *
            strength *
            -0.08;


        const baseY =
            dy *
            strength *
            -0.035;


        /* ===========================
           COMBINE
        =========================== */

        const finalX =
            baseX +
            data.glitchX;


        const finalY =
            baseY +
            data.glitchY;


        const finalRotation =
            data.rotation;


        const finalScaleX =
            1 +
            (
                (data.scaleX - 1)
                * strength
            );


        const finalScaleY =
            1 +
            (
                (data.scaleY - 1)
                * strength
            );


        /* ===========================
           APPLY
        =========================== */

        letter.style.transform = `

            translate3d(
                ${finalX}px,
                ${finalY}px,
                0
            )

            rotate(
                ${finalRotation}deg
            )

            scaleX(
                ${finalScaleX}
            )

            scaleY(
                ${finalScaleY}
            )

        `;


        /* ===========================
           DARK GLITCH FILTER
        =========================== */

        if (strength > 0.05) {

            /*
             * Red glow gets stronger
             * when corrupted.
             */

            const redGlow =
                strength * 18;


            /*
             * Tiny blur makes the
             * corruption feel unstable.
             */

            const blur =
                strength * 2;


            letter.style.filter = `

                blur(${blur}px)

                drop-shadow(
                    ${data.glitchX * 0.25}px
                    0
                    ${redGlow}px
                    rgba(
                        130,
                        0,
                        8,
                        ${strength * 0.45}
                    )
                )

            `;

        } else {

            letter.style.filter = "none";

        }

    });


    /* ===============================
       CURSOR GLITCH EFFECT
    =============================== */

    const cursorSize =
        15 +
        strongest * 8;


    cursor.style.width =
        cursorSize + "px";

    cursor.style.height =
        cursorSize + "px";


    cursor.style.boxShadow = `

        0 0
        ${5 + strongest * 8}px
        rgba(255,0,0,1),

        0 0
        ${15 + strongest * 15}px
        rgba(180,0,0,0.9),

        0 0
        ${40 + strongest * 40}px
        rgba(80,0,0,0.6)

    `;


    /* ===============================
       NEXT FRAME
    =============================== */

    requestAnimationFrame(animate);

}


animate();


/* =================================
   PAGE NAVIGATION
================================= */

function goTo(pageId) {

    document
        .querySelectorAll(".page")
        .forEach((page) => {

            page.classList.remove("active");

        });


    const target =
        document.getElementById(pageId);


    if (target) {

        target.classList.add("active");

    }

}
