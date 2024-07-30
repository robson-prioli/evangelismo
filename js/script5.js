//
const btns = document.querySelectorAll('.btn');
const btnOpenDialog = document.querySelector('.btn-open-dialog');
const btnCloseDialog = document.querySelector('.btn-close');

const dialog = document.querySelector('.dialog');
const background = document.querySelector('.background');

const screens = document.querySelectorAll('.screen');
const gridItens = document.querySelectorAll('.grid-item');

//
let changeColorTitle = false, chooseUser = null,  confirmActive = false;

/* btns */
btns[0].addEventListener('click', () => screens[1].classList.remove('up'));
btnOpenDialog.addEventListener('click', () => showDialog());
btnCloseDialog.addEventListener('click', () => {
    dialog.style.display = 'none';
    setTimeout(() => background.style.display = 'none', 700);
});

//
gridItens.forEach((gridItem, i) => gridItem.addEventListener('click', async() => {
    gridItens.forEach((div) => {
        if(div.classList.contains('active')){
            div.classList.remove('active')
        }
    });

    gridItem.classList.add('active');

    let backgroundColor = gridItem.getAttribute('data-color');
    screens[0].style.background = `${backgroundColor}`;
    screens[1].style.background = `${backgroundColor}`;
    screens[2].style.background = `${gridItem.getAttribute('data-color')}`;
    await getRandomVerse();
    

    if(!changeColorTitle){
        changeColorTitle = true;
        document.querySelector('h1').style.color = 'white';
        document.querySelector('h6').style.color = 'white';

    }

    if(i == 0){
        document.querySelector('.box-text').style.color = '#1f1f1f';
        document.querySelector('.box-text').style.borderColor = '#1f1f1f';
        document.querySelector('.box-book').style.color = '#1f1f1f';
        document.querySelector('.btn i').style.color = '#1f1f1f';
    } else {
        document.querySelector('.box-text').style.color = 'white';
        document.querySelector('.box-text').style.borderColor = 'white';
        document.querySelector('.box-book').style.color = 'white';
        document.querySelector('.btn i').style.color = 'white';
    }
    
    chooseUser = i;
}));

/** function`s */ 
const getRandomVerse = async() => {
    await fetch('data.json').then((res) => res.json()).then((json) => json.versiculos[Math.floor(Math.random() * json.versiculos.length)]).then(async (verse) => await loadVerse(verse));
}

const loadVerse = async(verse) => {
    document.querySelector('.box-text').innerText = `${verse.texto}`;
    document.querySelector('.box-book').innerText = `${verse.livro}`;

    setTimeout(() => { 
        screens[1].classList.add('up');
        setTimeout(() => showConfirm(), 2000);
    }, 1000);
}

const init = async() => {
    screens[0].classList.add('up');
    setTimeout(() => new TypeIt(".write", { speed: 150, startDelay: 1500, loop: true, loopDelay: 500 }).pause(2000).go(), 1000);

    setTimeout(() => document.querySelectorAll('.hidden-display').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.5}s !important`;
        setTimeout(() => item.style.opacity = 1, i * 0.5);
    }), 1000);
}

/* loader */
window.addEventListener('load', () => init());
