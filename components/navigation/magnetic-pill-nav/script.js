const items = document.querySelectorAll(".nav-item");
const pill = document.querySelector(".active-pill");
const nav = document.querySelector(".magnetic-nav");

function moveIndicator(el){
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.left = `${el.offsetLeft}px`;
}

moveIndicator(document.querySelector(".active"));

items.forEach(item=>{

    item.addEventListener("click",()=>{

        document
        .querySelector(".active")
        .classList.remove("active");

        item.classList.add("active");

        moveIndicator(item);
    });

    item.addEventListener("mousemove",(e)=>{

        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width/2) * 0.18;
        const moveY = (y - rect.height/2) * 0.18;

        item.style.transform =
        `translate(${moveX}px, ${moveY}px) scale(1.06)`;
    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform =
        "translate(0px,0px) scale(1)";
    });
});

nav.addEventListener("mousemove",(e)=>{

    const rect = nav.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    nav.style.transform =
    `rotateY(${(x-.5)*6}deg)
     rotateX(${(.5-y)*6}deg)`;
});

nav.addEventListener("mouseleave",()=>{

    nav.style.transform =
    "rotateX(0deg) rotateY(0deg)";
});