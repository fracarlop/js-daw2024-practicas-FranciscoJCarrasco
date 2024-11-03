
function noDialogo(palabra) {
    if (palabra == null) {
        return false;
    } else if (palabra.trim() == '') {
        return false
    } else {
        return true;
    }
}

function pedirPalabras() {

    let palabra = window.prompt("Introduce una palabra");
    let palabras = [];

    while (noDialogo(palabra)) {

        palabras.push(palabra.toLowerCase());

        palabra = window.prompt("Introduce una palabra");
    }

    return palabras;

}

function imprimirIterable(iterable, funcionImpresion) {
    iterable.forEach((valor, clave) => funcionImpresion(clave, valor));
}