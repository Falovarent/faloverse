/* =========================================================
   CURSOR
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
   PAGE NAVIGATION
========================================================= */

const pages = document.querySelectorAll(".page");
const navigationButtons = document.querySelectorAll("[data-page]");

function showPage(pageId) {

    const target = document.getElementById(pageId);

    if (!target) {
        console.error("Page not found:", pageId);
        return;
    }

    pages.forEach(function (page) {
        page.classList.remove("active");
    });

    target.classList.add("active");
}


/* =========================================================
   BUTTON EVENTS
========================================================= */

navigationButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const pageId = button.getAttribute("data-page");

        showPage(pageId);

    });

});


/* =========================================================
   CURSOR
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
   PAGE NAVIGATION
========================================================= */

const pages = document.querySelectorAll(".page");
const navigationButtons = document.querySelectorAll("[data-page]");

function showPage(pageId) {

    const target = document.getElementById(pageId);

    if (!target) {
        console.error("Page not found:", pageId);
        return;
    }

    pages.forEach(function (page) {
        page.classList.remove("active");
    });

    target.classList.add("active");
}


/* =========================================================
   BUTTON EVENTS
========================================================= */

navigationButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const pageId = button.getAttribute("data-page");

        showPage(pageId);

    });

});


/* =========================================================
   GLITCH SYSTEM
========================================================= */

const letters = document.querySelectorAll(".letter");

letters.forEach(function (letter) {

    letter.setAttribute(
        "data-char",
        letter.textContent
    );

});


const GLITCH_RADIUS = 120;

let glitchTimer = null;
let currentGlitchLetter = null;


/* Find the letter closest to the cursor */

function findClosestLetter() {

    let closest = null;
    let closestDistance = Infinity;

    letters.forEach(function (letter) {

        const rect = letter.getBoundingClientRect();

        const insideX =
            mouseX >= rect.left &&
            mouseX <= rect.right;

        const insideY =
            mouseY >= rect.top &&
            mouseY <= rect.bottom;

        if (!insideX || !insideY) {
            return;
        }

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        const distance =
            Math.sqrt(dx * dx + dy * dy);

        if (distance < closestDistance) {

            closestDistance = distance;
            closest = letter;

        }

    });

    return closest;
}


/* Create ONE short glitch burst */

function glitchLetter(letter) {

    if (!letter) {
        return;
    }

    letter.classList.remove("glitch");

    /* Random horizontal slice */

    const sliceTop =
        Math.floor(Math.random() * 75);

    const sliceHeight =
        Math.floor(5 + Math.random() * 15);

    const sliceBottom =
        100 - sliceTop - sliceHeight;


    /* Small digital offsets */

    const redOffset =
        Math.round(
            (Math.random() - 0.5) * 18
        );

    const darkOffset =
        Math.round(
            (Math.random() - 0.5) * 24
        );


    letter.style.setProperty(
        "--red-top",
        sliceTop + "%"
    );

    letter.style.setProperty(
        "--red-bottom",
        sliceBottom + "%"
    );

    letter.style.setProperty(
        "--dark-top",
        sliceTop + "%"
    );

    letter.style.setProperty(
        "--dark-bottom",
        sliceBottom + "%"
    );

    letter.style.setProperty(
        "--red-x",
        redOffset + "px"
    );

    letter.style.setProperty(
        "--dark-x",
        darkOffset + "px"
    );


    letter.classList.add("glitch");


    /* Remove the glitch after a tiny burst */

    setTimeout(function () {

        letter.classList.remove("glitch");

    }, 45 + Math.random() * 70);

}


/* =========================================================
   GLITCH LOOP
========================================================= */

function glitchLoop() {

    const closest = findClosestLetter();

    if (closest) {

        const rect =
            closest.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) +
            Math.pow(mouseY - centerY, 2)
        );


        if (distance < GLITCH_RADIUS) {

            /*
             * Only occasionally trigger.
             * This prevents shaking.
             */

            if (Math.random() < 0.12) {

                glitchLetter(closest);

            }

        }

    }

    requestAnimationFrame(glitchLoop);
}

glitchLoop();


/* =========================================================
   INTRO
========================================================= */

window.addEventListener("load", function () {

    const intro =
        document.getElementById("intro");

    setTimeout(function () {

        intro.style.opacity = "0";

        setTimeout(function () {

            intro.style.display = "none";

        }, 500);

    }, 3000);

});
