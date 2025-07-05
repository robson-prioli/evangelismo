async function getVerse() {
    try {
        const response = await fetch("https://bible-api.com/?random=verse&translation=almeida");
        const data = await response.json();
        return {
            text: data.text,
            reference: data.reference
        };
    } catch (error) {
        console.error("Erro ao buscar versículo:", error);
        return { text: "Erro ao carregar versículo.", reference: "" };
    }
}

function getLandscape() {
    return `https://picsum.photos/1080/1920?random=${Date.now()}`;
}

function formatTextWithBreaks(text, wordsPerLine = 3) {
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return '';
  
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      const slice = words.slice(i, i + wordsPerLine);
      lines.push(slice.join(' '));
    }
  
    // Aplica highlight na primeira linha apenas
    lines[0] = `<span class="highlight">${lines[0]}</span>`;
  
    return lines.join(' ');
}

async function loadContent() {
    try {
        //
        hidden_animation();

        //
        const verse = await getVerse();
        const imageUrl = getLandscape();
        
        let div_img = document.querySelectorAll('.landscape')[0];
        let div_verses = document.querySelectorAll('.verse')[0];
        let div_references = document.querySelectorAll('.reference')[0];

        let formatedText = formatTextWithBreaks(verse.text, 3);
        div_verses.innerHTML = `“${formatedText}`; // verse.text 
        div_references.innerHTML = `${verse.reference}`;
       
        div_img.src = imageUrl;

        //
        show_animation();
    } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
        verseElement.innerText = "Erro ao carregar versículo.";
    } 
}

let changebackground = 0;
async function changeBack(){
    changebackground++;
    changebackground = ((changebackground > 2) ? 0 : changebackground);

    if(changebackground){
        document.querySelectorAll('.img')[0].style = 'background: hsl(0deg 0% 0% / 75%);';
        document.querySelectorAll('.img img')[0].style = 'filter: none;';
    }else if(changebackground > 2){
        document.querySelectorAll('.img')[0].style = 'background: transparent;';
        document.querySelectorAll('.img img')[0].style = 'filter: opacity(0.7);';
    }else{
        document.querySelectorAll('.img')[0].style = 'background: transparent;';
        document.querySelectorAll('.img img')[0].style = 'filter: brightness(0.7);';
    }
}

async function show_animation() {
        // button instagram
        document.querySelectorAll('.igreja')[0].style = 'opacity: 1;transition-delay: 0.5s;';
        document.querySelectorAll('.verse')[0].style = 'opacity: 1;letter-spacing: 4px;transition-delay: 1.0s;';
        document.querySelectorAll('.reference')[0].style = 'opacity: 1;transition-delay: 1.5s;';
        document.querySelectorAll('.ticket')[0].style = 'opacity: 1;transition-delay: 2.0s;';

        // button instagram
        setTimeout(() => document.querySelectorAll('.instagram-box')[0].style = 'bottom: 5%;', 1500);
}

async function hidden_animation() {
    // button instagram
    document.querySelectorAll('.igreja')[0].style = 'opacity: 0;letter-spacing: 0px;';
    document.querySelectorAll('.verse')[0].style = 'opacity: 0;';
    document.querySelectorAll('.reference')[0].style = 'opacity: 0;';

    // button instagram
    document.querySelectorAll('.instagram-box')[0].style = 'bottom: -20%;';
}

// Carregar os conteúdos ao iniciar
window.onload = function(){
    document.body.style = 'opacity: 1';
    loadContent();
    
    //changeBack();
    document.querySelectorAll('.img')[0].style = 'background: transparent;';
    document.querySelectorAll('.img img')[0].style = 'filter: brightness(0.7);';
}