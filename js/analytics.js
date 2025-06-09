
const analytics = async(btnClick = false) => {
    try {

        // TODO: verifica se existe
        __book = typeof __book !== 'undefined' ? __book : {};

        // TODO: monta formData para envio
        let data = new FormData();
        data.append('btnClick', btnClick);
        data.append('action', ((btnClick) ? 'btn' : 'view')); 
        data.append('screen', `${window.screen.width}x${window.screen.height}`);
        data.append('book', `${__book}`);
        data.append('church', `${document.body.getAttribute('data-church')}`);
        data.append('callback', 'evangelismo');

        await fetch('https://robson-prioli.com/conviva/src/ajax/evangelismo.ajax.php', {method: 'POST', body: data });

    } catch (error) {
        console.log(error);
    }
}

if(document.querySelector('.btnClick')){
    document.querySelector('.btnClick').addEventListener('click', () => analytics(true));
}

window.addEventListener('load', async () => await Promise.all([await analytics()]));