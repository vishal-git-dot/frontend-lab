const dock = document.querySelector('.holo-dock');
const items = document.querySelectorAll('.dock-item');

items.forEach(item => {

  item.addEventListener('mouseenter', () => {
    activateMagnify(item);
  });

  item.addEventListener('mouseleave', () => {
    resetMagnify();
  });

  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });

});

function activateMagnify(activeItem){

  const index = [...items].indexOf(activeItem);

  items.forEach((item, i) => {

    const distance = Math.abs(index - i);

    let scale = 1;
    let translate = 0;

    if(distance === 0){
      scale = 1.15;
      translate = -18;
    }
    else if(distance === 1){
      scale = 1.08;
      translate = -10;
    }
    else if(distance === 2){
      scale = 1.03;
      translate = -4;
    }

    item.style.transform =
      `translateY(${translate}px) scale(${scale})`;
  });
}

function resetMagnify(){
  items.forEach(item => {
    item.style.transform = '';
  });
}

/* subtle tilt */

document.addEventListener('mousemove', e => {

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * -10;

  dock.style.transform =
    `rotateY(${x}deg) rotateX(${y}deg)`;
});
