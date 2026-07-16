/*==========================================================
  Frosted Refraction Card
  script.js
  Dynamic Light Tracking • 3D Tilt • Interaction System
==========================================================*/


const card = document.getElementById("glassCard");
const light = document.querySelector(".light");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/*==========================================================
  MOUSE LIGHT TRACKING
==========================================================*/

function moveLight(event){

    if(prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    light.style.left = `${x}px`;
    light.style.top = `${y}px`;

}


card.addEventListener(
    "mousemove",
    moveLight
);



/*==========================================================
  3D GLASS TILT
==========================================================*/

function tiltCard(event){

    if(prefersReducedMotion) return;


    const rect = card.getBoundingClientRect();


    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;


    const centerX =
        rect.width / 2;

    const centerY =
        rect.height / 2;


    const rotateX =
        ((y - centerY) / centerY) * -8;


    const rotateY =
        ((x - centerX) / centerX) * 8;



    card.style.transform = `

        perspective(1200px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

        translateY(-8px)

        scale(1.02)

    `;


    updateGlow(
        x,
        y
    );

}


card.addEventListener(
    "mousemove",
    tiltCard
);



/*==========================================================
  DYNAMIC GLOW POSITION
==========================================================*/

function updateGlow(x,y){

    light.style.left =
        `${x}px`;

    light.style.top =
        `${y}px`;

}



/*==========================================================
  RESET CARD
==========================================================*/

function resetCard(){

    card.style.transform = "";

    light.style.opacity = ".65";

}


card.addEventListener(
    "mouseleave",
    resetCard
);



/*==========================================================
  TOUCH SUPPORT
==========================================================*/

card.addEventListener(
    "touchmove",
    (event)=>{

        if(prefersReducedMotion)
            return;


        const touch =
            event.touches[0];


        const rect =
            card.getBoundingClientRect();


        const x =
            touch.clientX - rect.left;


        const y =
            touch.clientY - rect.top;


        updateGlow(
            x,
            y
        );

    },
    {
        passive:true
    }
);



/*==========================================================
  BUTTON MICRO INTERACTIONS
==========================================================*/

const buttons =
document.querySelectorAll(
    "button"
);


buttons.forEach(button=>{


    button.addEventListener(
        "mouseenter",
        ()=>{

            light.style.opacity =
                "1";

        }
    );


    button.addEventListener(
        "mouseleave",
        ()=>{

            light.style.opacity =
                ".65";

        }
    );


    button.addEventListener(
        "mousedown",
        ()=>{

            button.style.transform =
                "scale(.94)";

        }
    );


    button.addEventListener(
        "mouseup",
        ()=>{

            button.style.transform =
                "";

        }
    );


});



/*==========================================================
  PARALLAX DEPTH SYSTEM
==========================================================*/


const depthElements =
document.querySelectorAll(
    ".orb, .particles span, .holo-layer, .refraction-layer"
);



function depthMove(event){

    if(prefersReducedMotion)
        return;


    const rect =
        card.getBoundingClientRect();


    const x =
        (event.clientX - rect.left)
        /
        rect.width
        -
        .5;


    const y =
        (event.clientY - rect.top)
        /
        rect.height
        -
        .5;



    depthElements.forEach(
        (element,index)=>{


            const depth =
                (index + 1) * 4;


            element.style.transform =
            `
                translate3d(
                    ${x * depth}px,
                    ${y * depth}px,
                    0
                )
            `;


        }
    );

}


card.addEventListener(
    "mousemove",
    depthMove
);



/*==========================================================
  SMOOTH CURSOR LIGHT TRAIL
==========================================================*/


let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;



card.addEventListener(
    "mousemove",
    (event)=>{


        const rect =
            card.getBoundingClientRect();


        targetX =
            event.clientX - rect.left;


        targetY =
            event.clientY - rect.top;


    }
);



function animateLight(){

    if(!prefersReducedMotion){

        currentX +=
            (targetX - currentX)
            * .12;


        currentY +=
            (targetY - currentY)
            * .12;



        light.style.left =
            `${currentX}px`;


        light.style.top =
            `${currentY}px`;

    }


    requestAnimationFrame(
        animateLight
    );

}


animateLight();



/*==========================================================
  INITIAL LOAD EFFECT
==========================================================*/


window.addEventListener(
    "load",
    ()=>{

        card.style.opacity =
            "0";


        card.style.transform =
            "translateY(40px) scale(.96)";


        requestAnimationFrame(()=>{


            card.style.transition =
            `
                opacity 1s ease,
                transform 1.2s cubic-bezier(.19,1,.22,1)
            `;


            card.style.opacity =
                "1";


            card.style.transform =
                "";


        });


    }
);



/*==========================================================
  CLEAN RESIZE HANDLER
==========================================================*/


window.addEventListener(
    "resize",
    ()=>{

        light.style.opacity =
            ".65";

    }
);