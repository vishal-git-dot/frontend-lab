const nodes = document.querySelectorAll(".orbit-node");

const title = document.getElementById("title");
const desc = document.getElementById("desc");

nodes.forEach(node => {

  node.addEventListener("click", () => {

    document
      .querySelector(".orbit-node.active")
      ?.classList.remove("active");

    node.classList.add("active");

    title.style.opacity = 0;
    desc.style.opacity = 0;

    setTimeout(() => {

      title.textContent = node.dataset.title;
      desc.textContent = node.dataset.desc;

      title.style.opacity = 1;
      desc.style.opacity = 1;

    }, 180);

  });

  node.addEventListener("mousemove", e => {

    const rect = node.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    node.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.18),
        rgba(255,255,255,0.05) 55%
      )
    `;

  });

  node.addEventListener("mouseleave", () => {

    if(node.classList.contains("active")){

      node.style.background = `
        linear-gradient(
          135deg,
          rgba(0,229,255,0.28),
          rgba(139,92,246,0.18),
          rgba(255,79,216,0.25)
        )
      `;

    }else{

      node.style.background = `
        linear-gradient(
          135deg,
          rgba(255,255,255,0.1),
          rgba(255,255,255,0.04)
        )
      `;

    }

  });

});
