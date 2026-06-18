const island = document.getElementById("island");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click",()=>{

    island.classList.toggle("expanded");
});

const cards =
document.querySelectorAll(".nav-card");

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        document
        .querySelector(".nav-card.active")
        ?.classList.remove("active");

        card.classList.add("active");
    });

    card.addEventListener("mousemove",(e)=>{

        const rect =
        card.getBoundingClientRect();

        const x =
        (e.clientX - rect.left - rect.width/2)
        / rect.width;

        const y =
        (e.clientY - rect.top - rect.height/2)
        / rect.height;

        card.style.transform=
        `
        rotateY(${x*12}deg)
        rotateX(${-y*12}deg)
        translateY(-8px)
        scale(1.03)
        `;
    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";
    });
});

document.addEventListener("mousemove",(e)=>{

    const rect =
    island.getBoundingClientRect();

    const x =
    (e.clientX - rect.left - rect.width/2)
    / rect.width;

    const y =
    (e.clientY - rect.top - rect.height/2)
    / rect.height;

    island.style.transform=
    `
    rotateY(${x*4}deg)
    rotateX(${-y*4}deg)
    `;
});

document.addEventListener("mouseleave",()=>{

    island.style.transform=
    "rotateX(0deg) rotateY(0deg)";
});