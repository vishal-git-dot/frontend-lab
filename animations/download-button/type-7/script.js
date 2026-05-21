const btn = document.getElementById("launchBtn");
const progress = document.querySelector(".progress");
const particles = document.querySelector(".particles");

const CIRC = 565;
let active = false;

btn.addEventListener("click", () => {
  if (active) return;
  active = true;

  btn.classList.add("launching");

  let step = 0;

  const interval = setInterval(() => {

    step++;

    progress.style.strokeDashoffset = CIRC - (CIRC / 3) * step;

    createSparks();

    if (step === 3) {
      clearInterval(interval);

      btn.classList.remove("launching");
      btn.classList.add("launched");

      progress.style.strokeDashoffset = 0;

      setTimeout(() => {
        reset();
      }, 2500);
    }

  }, 1000);
});

function createSparks() {
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("div");
    s.className = "spark";

    const angle = Math.random() * Math.PI * 2;
    const r = 60 + Math.random() * 40;

    const x = 120 + Math.cos(angle) * r;
    const y = 120 + Math.sin(angle) * r;

    s.style.left = `${x}px`;
    s.style.top = `${y}px`;

    particles.appendChild(s);

    setTimeout(() => s.remove(), 600);
  }
}

function reset() {
  btn.classList.remove("launched");
  progress.style.strokeDashoffset = CIRC;
  active = false;
}
