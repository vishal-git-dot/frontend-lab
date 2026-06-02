const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

/* =========================
   TOGGLE SIDEBAR
========================= */

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

/* =========================
   ACTIVE ITEM + MAGNETIC GLOW
========================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

  item.addEventListener("mousemove", e => {

    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.style.setProperty("--x", `${x}px`);
    item.style.setProperty("--y", `${y}px`);

  });

  item.addEventListener("click", () => {

    document
      .querySelectorAll(".nav-item")
      .forEach(el => el.classList.remove("active"));

    item.classList.add("active");

  });

});

/* =========================
   HERO PARALLAX
========================= */

const heroPanel = document.querySelector(".hero-panel");

document.addEventListener("mousemove", (e) => {

  const x =
    (window.innerWidth / 2 - e.clientX) / 50;

  const y =
    (window.innerHeight / 2 - e.clientY) / 50;

  heroPanel.style.transform =
    `rotateY(${-x}deg) rotateX(${y}deg)`;

});



