const items = document.querySelectorAll(".dock-item");
const indicator = document.querySelector(".indicator");

items.forEach((item, index) => {

  item.addEventListener("click", () => {

    document.querySelector(".dock-item.active")
      .classList.remove("active");

    item.classList.add("active");

    const left = item.offsetLeft;

    indicator.style.left = `${left}px`;

    pulse(item);
  });

  item.addEventListener("mousemove", (e) => {

    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.16),
        rgba(255,255,255,0.05) 45%,
        rgba(255,255,255,0.03)
      )
    `;
  });

  item.addEventListener("mouseleave", () => {

    if(item.classList.contains("active")){
      item.style.background = "rgba(255,255,255,0.12)";
    }else{
      item.style.background = "rgba(255,255,255,0.04)";
    }
  });

});

function pulse(element){

  element.animate([
    {
      transform:"translateY(-16px) scale(1)"
    },
    {
      transform:"translateY(-22px) scale(1.18)"
    },
    {
      transform:"translateY(-16px) scale(1)"
    }
  ],{
    duration:500,
    easing:"cubic-bezier(.2,.9,.2,1.4)"
  });

}
