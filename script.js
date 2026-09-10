/* =================================
   ELEMENTS
================================= */

const cursor = document.querySelector(".cursor");


/* =================================
   MOUSE
================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


/* =================================
   MOUSE TRACKING
================================= */

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* =================================
   ANIMATION
================================= */

function animate() {

    /* Smooth cursor movement */

    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;


    /* Move red cursor */

    if (cursor) {

        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";

    }


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


    const target = document.getElementById(pageId);


    if (target) {

        target.classList.add("active");

    }

}
