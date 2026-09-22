/* =================================
   RED MOUSE CURSOR
================================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    cursor.style.opacity = "1";

});


/* =================================
   SECTION SCROLLING
================================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =================================
   INTRO / LOADING SCREEN
================================= */

window.addEventListener("load", function () {

    const intro = document.getElementById("intro");

    setTimeout(function () {

        intro.style.opacity = "0";

        setTimeout(function () {

            intro.style.display = "none";

        }, 500);

    }, 3000);

});
