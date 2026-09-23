/* =========================================================
   RED CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", function (event) {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
    cursor.style.opacity = "1";

});


/* =========================================================
   BACKGROUND GLITCH
========================================================= */

const letters = document.querySelectorAll(".letter");

const GLITCH_RADIUS = 115;

function updateGlitch() {

    letters.forEach(function (letter) {

        const rect = letter.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;

        const distance = Math.sqrt(
            distanceX * distanceX +
            distanceY * distanceY
        );

        if (distance < GLITCH_RADIUS) {

            const strength =
                1 - (distance / GLITCH_RADIUS);

            const glitchX =
                (Math.random() - 0.5) *
                22 *
                strength;

            const glitchY =
                (Math.random() - 0.5) *
                14 *
                strength;

            const skew =
                (Math.random() - 0.5) *
                8 *
                strength;

            const redX =
                (Math.random() - 0.5) *
                12 *
                strength;

            const redY =
                (Math.random() - 0.5) *
                7 *
                strength;

            const darkX =
                (Math.random() - 0.5) *
                16 *
                strength;

            const darkY =
                (Math.random() - 0.5) *
                9 *
                strength;

            letter.style.setProperty(
                "--glitch-x",
                glitchX + "px"
            );

            letter.style.setProperty(
                "--glitch-y",
                glitchY + "px"
            );

            letter.style.setProperty(
                "--glitch-skew",
                skew + "deg"
            );

            letter.style.setProperty(
                "--glitch-red-x",
                redX + "px"
            );

            letter.style.setProperty(
                "--glitch-red-y",
                redY + "px"
            );

            letter.style.setProperty(
                "--glitch-dark-x",
                darkX + "px"
            );

            letter.style.setProperty(
                "--glitch-dark-y",
                darkY + "px"
            );

            letter.classList.add("glitch");

        } else {

            letter.style.setProperty(
                "--glitch-x",
                "0px"
            );

            letter.style.setProperty(
                "--glitch-y",
                "0px"
            );

            letter.style.setProperty(
                "--glitch-skew",
                "0deg"
            );

            letter.style.setProperty(
                "--glitch-red-x",
                "0px"
            );

            letter.style.setProperty(
                "--glitch-red-y",
                "0px"
            );

            letter.style.setProperty(
                "--glitch-dark-x",
                "0px"
            );

            letter.style.setProperty(
                "--glitch-dark-y",
                "0px"
            );

            letter.classList.remove("glitch");

        }

    });

    requestAnimationFrame(updateGlitch);
}

updateGlitch();


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function (page) {

        page.classList.remove("active");

    });

    const target = document.getElementById(pageId);

    if (!target) {
        return;
    }

    target.classList.add("active");

}


/* =========================================================
   INTRO
========================================================= */

window.addEventListener("load", function () {

    const intro = document.getElementById("intro");

    setTimeout(function () {

        intro.style.opacity = "0";

        setTimeout(function () {

            intro.style.display = "none";

        }, 500);

    }, 3000);

});
