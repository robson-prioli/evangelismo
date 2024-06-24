const screens = document.querySelectorAll('.screen');

const changeScreen = async() => {
    screens[0].classList.add('up');

    setTimeout(() =>new TypeIt(".box-admirer", { speed: 150, startDelay: 3500, loop: true, loopDelay: 500 }), 3000);
}

window.addEventListener('load', () => setTimeout(() => changeScreen(), 2000));