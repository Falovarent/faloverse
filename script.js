/* =================================
   ELEMENTS
================================= */

const cursor = document.querySelector(".cursor");


/* =================================
   MOUSE POSITION
================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


/* =================================
   MOUSE TRACKING
================================= */

document.addEventListener("mousemove", function (event) {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* =================================
   CURSOR ANIMATION
================================= */

function animateCursor() {

    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;


    if (cursor) {

        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";

    }


    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =================================
   PAGE NAVIGATION
================================= */

function goTo(pageId) {

    const pages = document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);


    if (target) {

        target.classList.add("active");

    }

}/* =================================
   ELEMENTS
================================= */

const cursor = document.querySelector(".cursor");


/* =================================
   MOUSE POSITION
================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


/* =================================
   MOUSE TRACKING
================================= */

document.addEventListener("mousemove", function (event) {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* =================================
   CURSOR ANIMATION
================================= */

function animateCursor() {

    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;


    if (cursor) {

        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";

    }


    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =================================
   PAGE NAVIGATION
================================= */

function goTo(pageId) {

    const pages = document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);


    if (target) {

        target.classList.add("active");

    }

}
