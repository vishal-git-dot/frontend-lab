const items = document.querySelectorAll(".command-item");
const input = document.getElementById("commandInput");

items.forEach(item => {

  item.addEventListener("click", () => {

    document
      .querySelector(".command-item.active")
      ?.classList.remove("active");

    item.classList.add("active");

  });

  item.addEventListener("mousemove", e => {

    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.12),
        rgba(255,255,255,0.04) 40%
      )
    `;

  });

  item.addEventListener("mouseleave", () => {

    item.style.background = "";

  });

});

input.addEventListener("focus", () => {

  document.querySelector(".search-box")
    .style.transform = "scale(1.01)";

});

input.addEventListener("blur", () => {

  document.querySelector(".search-box")
    .style.transform = "scale(1)";

});
