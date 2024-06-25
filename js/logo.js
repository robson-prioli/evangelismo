const screens = document.querySelectorAll('.screen');

const changeScreen = async() => {
    screens[0].classList.add('up');

    setTimeout(() =>new TypeIt(".box-admirer", { speed: 150, startDelay: 1500, loop: true, loopDelay: 500 }).pause(2000).go(), 1000);
}

window.addEventListener('load', () => setTimeout(() => changeScreen(), 4000));