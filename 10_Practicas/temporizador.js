export function temporizador(milisegundos) {

    let tiempoFinalCorrecto = milisegundos;
    let tiempoFinalError = milisegundos * 2;

    let promesaFinalCorrecto = new Promise((resolver, rechazar) => {

        let timeout = setTimeout(() => {

            clearTimeout(timeout);
            resolver('Tiempo concluido');
                
        }, (tiempoFinalCorrecto));

    });

    let promesaError = new Promise((resolver, rechazar) => {

        let timeoutError = setTimeout(() => {

            clearTimeout(timeoutError);
            rechazar(Error('El tiempo no va bien'));

        }, tiempoFinalError);

        promesaFinalCorrecto.then(function (mensaje) {
            clearTimeout(timeoutError);
            resolver(mensaje);
        });
    });

    promesaError.then((mensaje)=>{

        console.log(mensaje);
        document.getElementById('contenedor').innerHTML = '<h1>' + mensaje + '</h1>';

    }).catch((error) => {

        console.log(error);
        document.getElementById('contenedor').innerHTML = '<h1>' + error + '</h1>';

    });
}

export async function cuenta(time, interval = 1, documentElement = document.body, callback = null) {

    let timeMls = time * 1000;
    let intervalMls = interval * 1000;

    let titulo = document.createElement('h1');
    titulo.innerHTML = 'Inicia la cuenta atrás desde ' + time + ' a intervalos de ' + interval + 's.'
    documentElement.appendChild(titulo);

    let subtitulo = document.createElement('h2');
    subtitulo.innerHTML = (timeMls / 1000);
    documentElement.appendChild(subtitulo);

    let cuentaAtras = setInterval(() => {

        timeMls -= intervalMls;

        let elemento = document.createElement('h2');
        elemento.innerHTML = (timeMls / 1000);
        documentElement.appendChild(elemento);

        if (timeMls == 0) {
            clearInterval(cuentaAtras);
            if (callback != null) callback();
        }

    }, intervalMls);


}