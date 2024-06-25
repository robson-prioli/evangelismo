// constante`s
const filter = document.querySelector('input[name="filter"]');
const boxResults = document.querySelector('.box-results .column');
const boxDataInfo = document.querySelector('.data-info');
// var`s
let json = null;

// input`s
filter.addEventListener('input', async (e) => checkVersiculo(e.target.value.toLowerCase()));

//
const getAllVersiculos = async() => {
    await fetch('data.json').then((res) => res.json()).then((j) => json = j).catch(() => alert(`error`));
}

const checkVersiculo = async(search) => {
    const newJson = json.versiculos.filter((versiculo) => versiculo.livro.toLowerCase().includes(search));
    
    console.log(json.versiculos);

    boxResults.innerHTML = '';

    if(newJson.length > 0){
        newJson.forEach(versiculo => {
        
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `${versiculo.livro}`;
            resultItem.addEventListener('click', () => resultHidden.classList.toggle('hidden'));

            const resultHidden = document.createElement('div');
            resultHidden.classList.add('result-hidden');
            resultHidden.innerHTML = `${versiculo.texto}`;
    
            resultItem.appendChild(resultHidden);
            boxResults.appendChild(resultItem);
        });
    } else {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item', 'error');
        resultItem.innerHTML = `Não há resultados com: <b>"${search}"</b>`;

        boxResults.appendChild(resultItem);
    }
}
    

const init = async() => {
    await getAllVersiculos().then(() => {
        boxDataInfo.innerHTML = `Busque pelos versiculos.<br>Total de versiculos: <b>${json.versiculos.length}</b>.<br>Ultima atualizacao: <b>${json['data']}</b>.`;
    });
}

// load
window.addEventListener('load', () => init());