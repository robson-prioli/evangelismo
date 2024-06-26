$(document).ready(function () {
    $('.container').mouseenter(function () {
        $('.card').stop().animate({
            top: '-90px'
        }, 'slow');
    }).mouseleave(function () {
        $('.card').stop().animate({
            top: 0
        }, 'slow');
    });
});


const getRandomVerses = async() => {
    return await fetch('data.json').then((res) => res.json());
}

const getRandomVerse = async(verses) => {
    return verses.versiculos[Math.floor(Math.random() * verses.versiculos.length)];
}

const loadVerses = async() => {
    await getRandomVerses().then(async (verses) => await getRandomVerse(verses).then(async(verse) => {
    
        document.querySelector('.text').innerText = `${verse.texto} - ${verse.livro}`;

    }).catch(()=> catchVerse())).catch(()=> catchVerse());  
}

window.addEventListener('load', () => loadVerses());