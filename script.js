function goTo(pageId) {
  const intro = document.getElementById('intro');

  intro.style.display = 'flex';

  setTimeout(() => {
    intro.style.display = 'none';
    showPage(pageId);
  }, 1500);
}

function goBack(pageId) {
  showPage(pageId);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = () => {
  const intro = document.getElementById('intro');
  intro.style.display = 'flex';

  setTimeout(() => {
    intro.style.display = 'none';
  }, 1500);
};
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
