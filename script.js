// Relación entre notas y sus tonos MIDI
const notasFrecuencias = {
    "Mi4": "E4",   // Mi en la 1ª línea
    "Fa4": "F4",   // Fa en el 1er espacio
    "Sol4": "G4",  // Sol en la 2ª línea
    "La4": "A4",   // La en el 2º espacio
    "Si4": "B4",   // Si en la 3ª línea
    "Do5": "C5",   // Do en el 3er espacio
    "Re5": "D5",   // Re en la 4ª línea
    "Mi5": "E5",   // Mi en el 4º espacio
    "Fa5": "F5"    // Fa en la 5ª línea
};

// Lista de imágenes con sus respectivas notas
const imagenes = [
    { url: "https://static.wixstatic.com/media/85afce_1b24f0e36f7e489e85b0b7b52ff0c498~mv2.png", nota: "Mi4" },
    { url: "https://static.wixstatic.com/media/85afce_1d78d5f0d82b4e4e82a49e2eb224c144~mv2.png", nota: "Sol4" },
    { url: "https://static.wixstatic.com/media/85afce_05a2778e6b9d496d8d4d0bbfd4f80e09~mv2.png", nota: "Si4" },
    { url: "https://static.wixstatic.com/media/85afce_a6e5c452d3124510a2450f04c70bbed2~mv2.png", nota: "Re5" },
    { url: "https://static.wixstatic.com/media/85afce_0f80cf1f0ec548bb8a30d5b29de47791~mv2.png", nota: "Fa5" },
    { url: "https://static.wixstatic.com/media/85afce_fcd53d416aad4105931bdaba29cb5128~mv2.png", nota: "Fa4" },
    { url: "https://static.wixstatic.com/media/85afce_b029bbb51b944c4895cc6c85e78f0a7b~mv2.png", nota: "La4" },
    { url: "https://static.wixstatic.com/media/85afce_4904adebb2554177914d767d6388c1a0~mv2.png", nota: "Do5" },
    { url: "https://static.wixstatic.com/media/85afce_948cc5d118dd4585a84eeacfcbdaaa03~mv2.png", nota: "Mi5" }
];

// Notas en orden de la escala musical
const notasEscala = ["Do5", "Re5", "Mi4", "Mi5", "Fa4", "Fa5", "Sol4", "La4", "Si4"];

let imagenActual = null;
let puntaje = 0;
let vidas = 3; // Agregamos vidas iniciales
let tiempoRestante = 60; // 60 segundos
let intervaloTiempo; // Guardará el temporizador
let juegoActivo = true; // Controla si el juego sigue activo

function nuevaRonda() {
    if (!juegoActivo || vidas <= 0) return;

    habilitarBotones();

    let notasPermitidas = obtenerNotasSeleccionadas();
    let imagenesFiltradas = imagenes.filter(img => notasPermitidas.includes(img.nota));

    if (imagenesFiltradas.length === 0) {
        alert("⚠️ Debes seleccionar al menos una nota para jugar.");
        return;
    }

    // Seleccionar una nueva imagen al azar
    imagenActual = imagenesFiltradas[Math.floor(Math.random() * imagenesFiltradas.length)];
    document.getElementById("imagenPentagrama").src = imagenActual.url;

    // Opciones de respuesta sin octava
    let opcionesHTML = "";
    let notasUnicas = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];

    notasUnicas.forEach(nota => {
        opcionesHTML += `<button onclick="verificarRespuesta('${nota}')">${nota}</button>`;
    });

    document.getElementById("opciones").innerHTML = opcionesHTML;
    document.getElementById("mensaje").textContent = "";

    actualizarVidas();
}


function verificarRespuesta(respuesta) {
    deshabilitarBotones();

    let notaCorrecta = imagenActual.nota; // Ejemplo: "Mi4", "Fa5"
    let notaSimple = notaCorrecta.replace(/[0-9]/g, ""); // Remueve el número (Ej: "Mi4" -> "Mi")

    if (respuesta === notaSimple) {
        document.getElementById("mensaje").textContent = "✅ ¡Correcto!";
        document.getElementById("mensaje").style.color = "green";

        puntaje += 1;
        document.getElementById("puntos").textContent = puntaje;

        reproducirNota(notasFrecuencias[notaCorrecta]); // Usa la imagen para el sonido correcto
        setTimeout(nuevaRonda, 500);
    } else {
        document.getElementById("mensaje").textContent = "❌ Incorrecto, pierdes una vida.";
        document.getElementById("mensaje").style.color = "red";

        reproducirError();
        vidas--;
        actualizarVidas();

        if (vidas <= 0) {
            clearInterval(intervaloTiempo);
            sonidoGameOver();
            setTimeout(() => {
                alert(`😢 ¡Game Over! \n🎯 Puntaje: ${puntaje} \n⏳ Tiempo restante: ${tiempoRestante} segundos`);
                reiniciarJuego();
            }, 1000);
        } else {
            setTimeout(nuevaRonda, 500);
        }
    }
}

function deshabilitarBotones() {
    document.querySelectorAll(".botones button").forEach(boton => {
        boton.disabled = true;
    });
}

function habilitarBotones() {
    document.querySelectorAll(".botones button").forEach(boton => {
        boton.disabled = false;
    });
}

function actualizarVidas() {
    let vidasHTML = "Vidas: " + "❤️".repeat(vidas);
    document.getElementById("vidas").innerHTML = vidasHTML;
}

function iniciarCronometro() {
    let seleccion = document.getElementById("tiempoJuego");
    tiempoRestante = parseInt(seleccion.value); // Obtiene el tiempo seleccionado en segundos

    document.getElementById("tiempo").textContent = tiempoRestante;

    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempo").textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            juegoActivo = false;

            sonidoVictoria(); // 🎉 Sonido de victoria
            setTimeout(() => {
                alert(`⏳ ¡Tiempo terminado! \n🎯 Puntaje final: ${puntaje}`);
                reiniciarJuego();
            }, 1000);
        }
    }, 1000);
}

function reiniciarJuego() {
    vidas = 3;
    puntaje = 0;
    juegoActivo = true;
    document.getElementById("puntos").textContent = puntaje;
    clearInterval(intervaloTiempo); // Detenemos cualquier temporizador activo
    iniciarCronometro(); // Reiniciamos el cronómetro con el tiempo elegido
    nuevaRonda();
}

function reproducirNota(nota) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(nota, "8n");
}

function reproducirError() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C2", "8n"); // Nota grave para indicar error
}

function sonidoGameOver() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("A2", "2n"); // Nota grave y larga para game over
}

function sonidoVictoria() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C5", "2n"); // Nota aguda y brillante para victoria
}

function actualizarNotas() {
    // Mostrar mensaje de confirmación
    let confirmar = confirm("¿Estás seguro de que deseas aplicar la nueva selección y comenzar el juego?");
    
    if (confirmar) {
        reiniciarJuego(); // Reinicia el juego solo si el usuario confirma
    }
}

function obtenerNotasSeleccionadas() {
    let notasSeleccionadas = [];

    // Capturar notas de líneas
    document.querySelectorAll("#seleccionLineas input:checked").forEach(checkbox => {
        notasSeleccionadas.push(checkbox.value);
    });

    // Capturar notas de espacios
    document.querySelectorAll("#seleccionEspacios input:checked").forEach(checkbox => {
        notasSeleccionadas.push(checkbox.value);
    });

    return notasSeleccionadas;
}

// Iniciamos el juego
iniciarCronometro();
nuevaRonda();
