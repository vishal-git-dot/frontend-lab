const svg = document.getElementById("network-svg");
const nodes = document.querySelectorAll(".node");

function buildNetwork(){

    svg.innerHTML = `
    <defs>
        <linearGradient id="gradientLine">
            <stop offset="0%" stop-color="#54f4ff"/>
            <stop offset="100%" stop-color="#7b5cff"/>
        </linearGradient>
    </defs>
    `;

    const positions = [];

    nodes.forEach(node=>{

        const rect = node.getBoundingClientRect();
        const parent = svg.getBoundingClientRect();

        positions.push({
            x: rect.left - parent.left + rect.width/2,
            y: rect.top - parent.top + rect.height/2
        });
    });

    const links = [
        [0,1],
        [1,2],
        [0,3],
        [1,4],
        [2,5],
        [3,4],
        [4,5]
    ];

    links.forEach(link=>{

        const line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", positions[link[0]].x);
        line.setAttribute("y1", positions[link[0]].y);

        line.setAttribute("x2", positions[link[1]].x);
        line.setAttribute("y2", positions[link[1]].y);

        line.classList.add("connection");

        svg.appendChild(line);
    });
}

buildNetwork();
window.addEventListener("resize", buildNetwork);

nodes.forEach((node,index)=>{

    node.addEventListener("mouseenter",()=>{

        const lines =
        document.querySelectorAll(".connection");

        lines.forEach((line,i)=>{

            setTimeout(()=>{
                line.classList.add("active");
            },i*50);
        });

        node.style.transform =
        "translateY(-10px) scale(1.05) rotateX(10deg)";
    });

    node.addEventListener("mouseleave",()=>{

        document
        .querySelectorAll(".connection")
        .forEach(line=>{
            line.classList.remove("active");
        });

        node.style.transform="";
    });

    node.addEventListener("click",()=>{

        document
        .querySelector(".active")
        ?.classList.remove("active");

        node.classList.add("active");
    });
});

document.addEventListener("mousemove",(e)=>{

    nodes.forEach(node=>{

        const rect = node.getBoundingClientRect();

        const x =
        (e.clientX - rect.left - rect.width/2)
        / rect.width;

        const y =
        (e.clientY - rect.top - rect.height/2)
        / rect.height;

        node.style.transform =
        `
        rotateY(${x*10}deg)
        rotateX(${-y*10}deg)
        `;
    });
});