// Selección de elementos del DOM
const txtEncriptar = document.querySelector(".input-class");
const aviso = document.querySelector(".info");
const respuesta = document.querySelector(".respuesta");
const contenidoBefore = document.querySelector(".right-content-before");
const contenidoAfter = document.querySelector(".right-content-after");
const encryptButton = document.querySelector(".actions-box1");
const desencryptButton = document.querySelector(".actions-box2");
const copyButton = document.querySelector(".actions-box3");

// Función de validación de texto
function validarTexto(texto) {
    let txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");

    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
        return false;
    } else if (texto !== txt) {
        mostrarAviso("No debe tener acentos y caracteres especiales");
        return false;
    } else if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe ser todo en minúscula");
        return false;
    }
    return true;
}

// Evento para encriptar texto
encryptButton.addEventListener("click", e => {
    e.preventDefault();

    let texto = txtEncriptar.value.trim();

    if (validarTexto(texto)) {
        texto = texto.replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");

        respuesta.innerHTML = texto;
        contenidoBefore.style.display = "none";
        contenidoAfter.style.display = "flex";
    }
});

// Evento para desencriptar texto
desencryptButton.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtEncriptar.value.trim();

    if (validarTexto(texto)) {
        texto = texto.replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");

        respuesta.innerHTML = texto;
        contenidoBefore.style.display = "none";
        contenidoAfter.style.display = "flex";
    }
});

// Evento para copiar texto al portapapeles
copyButton.addEventListener("click", e => {
    e.preventDefault();
    const texto = respuesta.textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            mostrarAviso("Texto copiado al portapapeles");
        }).catch(err => {
            mostrarAviso('Error al copiar el texto');
            console.error('Error al copiar: ', err);
        });
    } else {
        mostrarAviso('El navegador no soporta la API de Portapapeles');
        console.error('El navegador no soporta la API de Portapapeles');
    }
});

// Función para mostrar avisos al usuario
function mostrarAviso(mensaje) {
    aviso.style.background = "#0A3871";
    aviso.style.color = "#FFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;

    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
}

