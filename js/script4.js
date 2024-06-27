//
const btn = document.querySelector('.btn');
const screens = document.querySelectorAll('.screen');
const dialogItens = document.querySelectorAll('.grid-item');

//
let changeColorTitle = false, chooseUser = null;

//
btn.addEventListener('click', () => screens[1].classList.remove('up'));

//
dialogItens.forEach((dialogItem, i) => dialogItem.addEventListener('click', async() => {
    dialogItens.forEach((div) => {
        if(div.classList.contains('active')){
            div.classList.remove('active')
        }
    });

    dialogItem.classList.add('active');

    let backgroundColor = dialogItem.getAttribute('data-color');
    screens[0].style.background = `${backgroundColor}`;
    screens[1].style.background = `${backgroundColor}`;
    screens[2].style.background = `${dialogItem.getAttribute('data-color')}`;
    await getRandomVerse();
    

    if(!changeColorTitle){
        changeColorTitle = true;
        document.querySelector('h1').style.color = 'white';
        document.querySelector('h6').style.color = 'white';

    }

    if((i == 1 || i == 4)){
        document.querySelector('.box-text').style.color = '#1f1f1f';
        document.querySelector('.box-text').style.borderColor = '#1f1f1f';
        document.querySelector('.box-book').style.color = '#1f1f1f';
        document.querySelector('.btn i').style.color = '#1f1f1f';
    }else{
        document.querySelector('.box-text').style.color = 'white';
        document.querySelector('.box-text').style.borderColor = 'white';
        document.querySelector('.box-book').style.color = 'white';
        document.querySelector('.btn i').style.color = 'white';
    }
    
}));

/** function`s */ 
const getRandomVerse = async() => {
    await fetch('data.json').then((res) => res.json()).then((json) => json.versiculos[Math.floor(Math.random() * json.versiculos.length)]).then(async (verse) => await loadVerse(verse));
}

const loadVerse = async(verse) => {
    document.querySelector('.box-text').innerText = `${verse.texto}`;
    document.querySelector('.box-book').innerText = `${verse.livro}`;

    setTimeout(() => screens[1].classList.add('up'), 1000);
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
window.addEventListener('load', () => init())
