const cursor = document.querySelector(".cursor");
const word = document.querySelector(".background-word span");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


/* =========================
   MOUSE
   ========================= */

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});


/* =========================
   ANIMATION
   ========================= */

function animate() {

    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;


    /* CURSOR */

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";


    /* WORD POSITION */

    const rect = word.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;


    const distanceX = currentX - centerX;
    const distanceY = currentY - centerY;

    const distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
    );


    /* HOW CLOSE THE CURSOR IS */

    const influence = Math.max(
        0,
        1 - distance / 500
    );


    /* DISTORTION */

    const moveX =
        distanceX * influence * -0.035;

    const moveY =
        distanceY * influence * -0.035;

    const skew =
        distanceX * influence * 0.015;

    const scaleX =
        0.9 + influence * 0.06;


    word.style.transform = `
        translate(${moveX}px, ${moveY}px)
        scaleX(${scaleX})
        skewX(${skew}deg)
    `;


    /* RED CURSOR GLOW */

    if (influence > 0) {

        const size =
            18 + influence * 22;

        cursor.style.width = size + "px";
        cursor.style.height = size + "px";

        cursor.style.boxShadow = `
            0 0 ${10 + influence * 10}px rgba(255,20,20,1),
            0 0 ${30 + influence * 30}px rgba(255,20,20,0.8),
            0 0 ${60 + influence * 50}px rgba(255,20,20,0.4)
        `;

    } else {

        cursor.style.width = "18px";
        cursor.style.height = "18px";

    }


    requestAnimationFrame(animate);
}

animate();
