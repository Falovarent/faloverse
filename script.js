
document.addEventListener("DOMContentLoaded", () => {

    const mainSite =
        document.getElementById("main-site");

    const book =
        document.getElementById("book");

    const readMore =
        document.getElementById("read-more");

    const closeBook =
        document.getElementById("close-book");

    const cursor =
        document.querySelector(".cursor");


    /* ====================================
       SCROLLING NAVIGATION
    ==================================== */

    document.querySelectorAll("[data-page]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const pageId = button.dataset.page;

                const target =
                    document.getElementById(pageId);

                if (!target || !mainSite) {
                    return;
                }

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* ====================================
       OPEN SEPARATE SILENT KILL VIEW
    ==================================== */

    if (readMore && book && mainSite) {

        readMore.addEventListener("click", () => {

            /*
               Hide the entire scrolling
               website.

               Keep its scroll position.
            */

            mainSite.classList.add("hidden");

            book.classList.add("open");

            book.removeAttribute("inert");

            book.setAttribute(
                "aria-hidden",
                "false"
            );

            closeBook?.focus({
                preventScroll: true
            });

        });

    }


    /* ====================================
       CLOSE SILENT KILL
    ==================================== */

    function closeComic() {

        if (!book || !mainSite) {
            return;
        }

        book.classList.remove("open");

        book.setAttribute(
            "aria-hidden",
            "true"
        );

        book.setAttribute("inert", "");

        mainSite.classList.remove("hidden");

        readMore?.focus({
            preventScroll: true
        });

    }


    if (closeBook) {

        closeBook.addEventListener(
            "click",
            closeComic
        );

    }


    /* ESCAPE KEY */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            book?.classList.contains("open")
        ) {
            closeComic();
        }

    });


    /* ====================================
       PLAIN RED CURSOR
    ==================================== */

    if (cursor) {

        document.addEventListener("mousemove", event => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        });

    }

});
