
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


    /* =====================================
       SCROLL NAVIGATION
    ===================================== */

    document.querySelectorAll("[data-page]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const pageId =
                    button.getAttribute("data-page");

                const target =
                    document.getElementById(pageId);

                if (!target || !mainSite) {
                    return;
                }

                mainSite.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================
       OPEN SILENT KILL
    ===================================== */

    if (readMore && book && mainSite) {

        readMore.addEventListener("click", () => {

            book.classList.add("open");

            book.setAttribute(
                "aria-hidden",
                "false"
            );

            mainSite.style.overflowY = "hidden";

            closeBook?.focus();

        });

    }


    /* =====================================
       CLOSE SILENT KILL
    ===================================== */

    function closeComicView() {

        if (!book || !mainSite) {
            return;
        }

        book.classList.remove("open");

        book.setAttribute(
            "aria-hidden",
            "true"
        );

        mainSite.style.overflowY = "auto";

        readMore?.focus();

    }

    if (closeBook) {

        closeBook.addEventListener(
            "click",
            closeComicView
        );

    }


    /* ESC KEY CLOSES COMIC */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            book?.classList.contains("open")
        ) {
            closeComicView();
        }

    });


    /* =====================================
       CUSTOM CURSOR
    ===================================== */

    if (cursor) {

        document.addEventListener(
            "mousemove",
            event => {

                cursor.style.left =
                    event.clientX + "px";

                cursor.style.top =
                    event.clientY + "px";

            }
        );

    }

});
