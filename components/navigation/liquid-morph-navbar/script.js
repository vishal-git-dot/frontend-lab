const items = document.querySelectorAll(".nav-item");
const blob = document.querySelector(".morph-blob");

function moveBlob(target){

  blob.style.width = `${target.offsetWidth}px`;
  blob.style.left = `${target.offsetLeft}px`;

}

items.forEach(item => {

  item.addEventListener("click", () => {

    document
      .querySelector(".nav-item.active")
      ?.classList.remove("active");

    item.classList.add("active");

    moveBlob(item);

  });

  item.addEventListener("mousemove", e => {

    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.12),
        transparent 60%
      )
    `;

  });

  item.addEventListener("mouseleave", () => {

    item.style.background = "transparent";

  });

});

window.addEventListener("load", () => {

  const active = document.querySelector(".nav-item.active");

  moveBlob(active);

});

window.addEventListener("resize", () => {

  const active = document.querySelector(".nav-item.active");

  moveBlob(active);

});
