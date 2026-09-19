const cursor = document.querySelector(".cursor");

let mouseX = null;
let mouseY = null;

let currentX = null;
let currentY = null;


/* =========================
   RED CURSOR
========================= */

document.addEventListener("mousemove", function (event) {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (currentX === null) {
        currentX = mouseX;
        currentY = mouseY;

        cursor.style.opacity = "1";
    }

});


function animateCursor() {

    if (mouseX !== null && currentX !== null) {

        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;

        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";

    }

    requestAnimationFrame(animateCursor);
}


animateCursor();


/* =========================
   PAGE NAVIGATION
========================= */

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

window.onload = () => {
    const intro = document.getElementById("intro");

    intro.style.display = "flex";

    setTimeout(() => {
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
            intro.style.opacity = "1";
        }, 500);

    }, 3000);
};
