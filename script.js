/* =========================
   ELEMENTS
   ========================= */

const cursor =
    document.querySelector(".cursor");

const distortedWord =
    document.querySelector(".word-distorted");

const intro =
    document.getElementById("intro");


/* =========================
   MOUSE
   ========================= */

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


/* =========================
   CURSOR + DISTORTION
   ========================= */

function animate() {

    /* Smooth cursor */

    currentX +=
        (mouseX - currentX) * 0.15;

    currentY +=
        (mouseY - currentY) * 0.15;


    /* Cursor position */

    cursor.style.left =
        currentX + "px";

    cursor.style.top =
        currentY + "px";


    /* Send mouse position to CSS */

    document.documentElement
        .style
        .setProperty(
            "--mouse-x",
            currentX + "px"
        );

    document.documentElement
        .style
        .setProperty(
            "--mouse-y",
            currentY + "px"
        );


    /* =========================
       WORD DISTORTION
       ========================= */

    const word =
        document
            .querySelector(".word-base");

    const rect =
        word.getBoundingClientRect();


    const wordCenterX =
        rect.left +
        rect.width / 2;

    const wordCenterY =
        rect.top +
        rect.height / 2;


    const dx =
        currentX -
        wordCenterX;

    const dy =
        currentY -
        wordCenterY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    /*
       Distortion radius.
       Smaller = more concentrated.
    */

    const radius = 190;


    let influence =
        Math.max(
            0,
            1 - distance / 600
        );


    /*
       Only show the distorted
       layer when the cursor is
       reasonably close.
    */

    if (influence > 0) {

        const clipRadius =
            70 + influence * radius;


        distortedWord.style.clipPath =
            `circle(
                ${clipRadius}px
                at
                ${currentX}px
                ${currentY}px
            )`;


        /*
           Make the distortion
           stronger near the cursor.
        */

        const displacement =
            influence * 55;


        const filter =
            document
                .querySelector(
                    "#cursorDistortion"
                );


        const displacementMap =
            filter
                .querySelector(
                    "feDisplacementMap"
                );


        displacementMap
            .setAttribute(
                "scale",
                displacement
            );


        /*
           Stretch the distorted
           area toward the cursor.
        */

        const pullX =
            dx * influence * -0.025;

        const pullY =
            dy * influence * -0.025;


        distortedWord.style.transform =
            `
            translate(
                ${pullX}px,
                ${pullY}px
            )
            scaleX(0.9)
            `;


        /*
           Cursor gets bigger
           near the letters.
        */

        const size =
            16 +
            influence * 14;


        cursor.style.width =
            size + "px";

        cursor.style.height =
            size + "px";


        cursor.style.boxShadow = `
            0 0 10px rgba(255,20,20,1),
            0 0 25px rgba(255,20,20,0.9),
            0 0 55px rgba(255,20,20,0.55),
            0 0 90px rgba(255,20,20,0.25)
        `;

    } else {

        distortedWord.style.clipPath =
            `circle(
                0px
                at
                ${currentX}px
                ${currentY}px
            )`;


        cursor.style.width =
            "16px";

        cursor.style.height =
            "16px";

    }


    requestAnimationFrame(
        animate
    );
}


/* =========================
   PAGE NAVIGATION
   ========================= */

function goTo(pageId) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        (page) => {

            page.classList.remove(
                "active"
            );

        }
    );


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


/*
   Keep old buttons working
   if anything still uses goBack().
*/

function goBack(pageId) {

    goTo(pageId);

}


/* =========================
   INTRO
   ========================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                intro.style.opacity =
                    "0";

                intro.style.pointerEvents =
                    "none";

                setTimeout(
                    () => {

                        intro.style.display =
                            "none";

                    },
                    500
                );

            },
            1000
        );

    }
);


/* =========================
   START
   ========================= */

animate();
