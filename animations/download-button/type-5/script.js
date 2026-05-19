const button = document.getElementById("downloadBtn");
const exhaust = document.getElementById("exhaust");

button.addEventListener("click", () => {

  if (
    button.classList.contains("loading") ||
    button.classList.contains("success")
  ) return;

  button.classList.add("loading");

  // Particle generator
  const interval = setInterval(() => {
    createParticle();
  }, 80);

  setTimeout(() => {
    clearInterval(interval);
  }, 1500);

  // End animation
  setTimeout(() => {

    button.classList.remove("loading");
    button.classList.add("success");

    button.innerHTML = `
      <span class="text">✓ Downloaded</span>
    `;

  }, 2200);

});

function createParticle() {
  const p = document.createElement("div");
  p.classList.add("particle");

  // random horizontal spread
  const x = (Math.random() - 0.5) * 120;
  p.style.setProperty("--x", `${x}px`);

  exhaust.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, 800);
}
