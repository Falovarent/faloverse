const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";
    cursor.style.opacity = "1";
});

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
