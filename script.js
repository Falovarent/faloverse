/* =========================================================
   WAIT UNTIL THE HTML IS READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const intro = document.getElementById("intro");
    const cursor = document.querySelector(".cursor");

    const pages = document.querySelectorAll(".page");
    const buttons = document.querySelectorAll("[data-page]");
    const letters = document.querySelectorAll(".letter");


    /* =====================================================
       CURSOR
       ONLY FOLLOWS THE MOUSE
       NOTHING ELSE
    ===================================================== */

    if (cursor) {

        document.addEventListener("mousemove", function (event) {

            cursor.style.left = event.clientX + "px";
            cursor.style.top = event.clientY + "px";
            cursor.style.opacity = "1";

        });

    }


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function showPage(pageID) {

        const target = document.getElementById(pageID);

        if (!target) {
            return;
        }

        pages.forEach(function (page) {

            page.classList.remove("active");

        });

        target.classList.add("active");

    }


    /* =====================================================
       BUTTONS
    ===================================================== */

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const pageID =
                button.getAttribute("data-page");

            showPage(pageID);

        });

    });


    /* =====================================================
       INFINITE BACKGROUND GLITCH
       
       THIS HAS NOTHING TO DO WITH THE CURSOR.
       
       It runs continuously by itself.
    ===================================================== */

    letters.forEach(function (letter) {

        const character = letter.textContent;

        letter.setAttribute(
            "data-char",
            character
        );

    });


    /*
       Force the glitch animation to be alive forever.
       CSS handles the actual animation.
    */

    letters.forEach(function (letter) {

        letter.classList.add("always-glitch");

    });


    /* =====================================================
       LOADING SCREEN
       
       IMPORTANT:
       This is completely independent from the glitch.
    ===================================================== */

    if (intro) {

        setTimeout(function () {

            intro.classList.add("intro-hidden");

        }, 3000);


        /*
           Completely remove the loading screen after
           the fade finishes.
        */

        setTimeout(function () {

            intro.style.display = "none";

        }, 3600);

    }


});
