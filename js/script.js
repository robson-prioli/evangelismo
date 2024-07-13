// 
const boxVerse = document.querySelector('.box-verse');

// var`s
let backgrounds = ['clouds-1838410_1280.jpg', 'landscape-4547734_1280.jpg', 'mountain-5195052_1280.jpg', 'nature-4785780_1280.jpg', 'seascape-4730202_1280.jpg', 'sun-5685447_1280.jpg']; 

const getRandomVerses = async() => {
    return await fetch('data.json').then((res) => res.json());
}

const loadVerses = async() => {
    await getRandomVerses().then(async (verses) => await getRandomVerse(verses).then(async(verse) => {
        
        const boxTexto = document.createElement('div');
        boxTexto.classList.add('box-text');
        boxTexto.innerHTML = `${verse.texto}`;

        const boxBook = document.createElement('div');
        boxBook.classList.add('box-book');
        boxBook.innerHTML = `${verse.livro}`;

        boxVerse.appendChild(boxTexto);
        boxVerse.appendChild(boxBook);
    }).catch(()=> catchVerse())).catch(()=> catchVerse());  
}

const getRandomVerse = async(verses) => {
    return verses.versiculos[Math.floor(Math.random() * verses.versiculos.length)];
}

const catchVerse = async() => {
    boxVerse.innerHTML = `error`;
}

const analytics = async(btnClick = false) => {
    try {
        let data = new FormData();
        data.append('btnClick', btnClick);
        data.append('action', ((btnClick) ? 'btn' : 'view')); 
        data.append('screen', `${window.screen.width}x${window.screen.height}`);
        data.append('callback', 'evangelismo');

        await fetch('https://robson-prioli.com/conviva/src/ajax/evangelismo.ajax.php', {method: 'POST', body: data });

    } catch (error) {
        console.log(error);
    }
}

if(document.querySelector('.btnClick')){
    document.querySelector('.btnClick').addEventListener('click', () => analytics(true));
}

window.addEventListener('load', async () => await Promise.all([await loadVerses(), await analytics()]));