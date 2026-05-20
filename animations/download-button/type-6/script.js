const btn = document.getElementById("downloadBtn");
const text = btn.querySelector(".text");
const icon = btn.querySelector(".icon");

btn.addEventListener("click", () => {

  if (btn.classList.contains("success")) return;

  btn.classList.add("success");

  text.textContent = "Completed";
  icon.textContent = "✓";

  createBurst();

  setTimeout(() => {
    btn.classList.remove("success");
    text.textContent = "Download";
    icon.textContent = "✦";
  }, 2600);
});

function createBurst() {

  for (let i = 0; i < 16; i++) {

    const particle = document.createElement("span");

    particle.className = "burst-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 50;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.style.left = "50%";
    particle.style.top = "50%";

    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);

    btn.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

const style = document.createElement("style");

style.innerHTML = `
.burst-particle {
  position: absolute;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  animation: burst 1s ease-out forwards;
  box-shadow: 0 0 10px white;
}

@keyframes burst {
  0% {
    transform: translate(0,0) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(var(--x), var(--y)) scale(0);
    opacity: 0;
  }
}
`;

document.head.appendChild(style);
