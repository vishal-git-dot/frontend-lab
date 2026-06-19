const buttons = document.querySelectorAll('.command-btn');

buttons.forEach(btn => {

    btn.addEventListener('click', () => {

        buttons.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

    });

});

function updateClock(){

    const now = new Date();

    const time =
        now.toLocaleTimeString('en-US',{
            hour12:false
        });

    document.getElementById('clock').textContent = time;

}

setInterval(updateClock,1000);

updateClock();