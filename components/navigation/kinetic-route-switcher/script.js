
const routes = document.querySelectorAll('.route');
const pages = document.querySelectorAll('.page');
const capsule = document.querySelector('.liquid-capsule');

let currentX = 0;
let targetX = 0;

function activate(index){

routes.forEach(r=>r.classList.remove('active'));
pages.forEach(p=>p.classList.remove('active'));

routes[index].classList.add('active');
pages[index].classList.add('active');

const rect = routes[index].getBoundingClientRect();
const parent = routes[index]
.parentElement
.getBoundingClientRect();

targetX = rect.left - parent.left;

capsule.style.width = `${rect.width}px`;
}

function animate(){

currentX += (targetX - currentX) * 0.12;

capsule.style.transform =
`translateX(${currentX}px)`;

requestAnimationFrame(animate);
}

routes.forEach((route,index)=>{

route.addEventListener('click',()=>{

activate(index);

capsule.animate(
[
{
transform:
`translateX(${currentX}px) scaleX(1.18)`
},
{
transform:
`translateX(${targetX}px) scaleX(1)`
}
],
{
duration:650,
easing:'cubic-bezier(.22,1,.36,1)'
}
);

});

});

window.addEventListener('load',()=>{

activate(0);
animate();

});

window.addEventListener('resize',()=>{

const active =
document.querySelector('.route.active');

const rect =
active.getBoundingClientRect();

const parent =
active.parentElement.getBoundingClientRect();

targetX = rect.left - parent.left;

capsule.style.width =
`${rect.width}px`;

});

