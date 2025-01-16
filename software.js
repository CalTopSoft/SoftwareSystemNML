// Funciones para mostrar y ocultar el spinner
function mostrarSpinner() {
    document.getElementById("spinner").style.display = "flex";
}

function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
}
const logosPath = {
    "EXYLUS": "logos/EXY_TOP.png",
    "GZ MOB": "logos/GLIZZY.png",
    "GLIZZY GANG BR": "logos/GLIZZY.png",
    "GZ SKB":"logos/GLIZZY.png",
    "T1": "logos/T1",
    "COMPLEXITY": "logos/XTY.png",
    "COMPLEXITY XT": "logos/XTY.png",
    "Exy Girls": "logos/EXYG.png",
    "IBERUCHITOS GANG": "logos/BGZ.png",
    "1%": "logos/1.png",
    "1% MOBILE": "logos/1M.png",
    "Sixshotz": "logos/SIX.png",
    "RAIKENS SIX": "logos/RKS.png",

    "TC": "logos/TC.png",
    "TC 2": "logos/TC.png",
    "TEAM REX": "logos/REX.png",
    "E11 ELEVEN": "logos/EXY_MOBILE.png",
    "E11 ELEVEN EXY": "logos/EXY_MOBILE.png",
    "AKATSUKI": "logos/AKU.png",
    "TM30 SILVER": "logos/TM.png",
    "T7": "logos/T7.png",
    "THE SEVEN": "logos/T7.png",
    "NAK": "logos/NAK.png",
    "NXT LETHAL": "logos/NXT.png",
    "ZODIAC": "logos/ZD.png",
    "KING MORTAL": "logos/KGM.png",

};


const positions = {
    logo: [
        [605, 915], [605, 1160], [605, 1400], [605, 1640],
        [605, 1880], [605, 2120], [605, 2360], [605, 2600],
    ],
    equipo: [
        [1060, 1099], [1060, 1335], [1060, 1578], [1060, 1815],
        [1060, 2059], [1060, 2299], [1060, 2539], [1060, 2782],
    ],
    kills: [
        [2115, 1110], [2115, 1347], [2115, 1585], [2115, 1826],
        [2115, 2065], [2115, 2305], [2115, 2547], [2115, 2786],
    ],
    top: [
        [2571, 1110], [2571, 1347], [2571, 1585], [2571, 1826],
        [2571, 2065], [2571, 2305], [2571, 2547], [2571, 2786],
    ],
    total: [
        [3020, 1110], [3020, 1347], [3020, 1585], [3020, 1826],
        [3020, 2065], [3020, 2305], [3020, 2547], [3020, 2786],
    ]
};

class Equipo {
    constructor(nombre) {
        this.nombre = nombre;
        this.kills = Array(4).fill(0);
        this.top = Array(4).fill(0);
        this.totalKills = 0;
        this.totalTop = 0;
        this.totalPuntaje = 0;
    }

    calcularTotales() {
        this.totalKills = this.kills.reduce((a, b) => a + b, 0);
        this.totalTop = this.top.reduce((a, b) => a + this.calcularPuntosTop(b), 0);
        this.totalPuntaje = this.totalKills + this.totalTop;
    }

    calcularPuntosTop(posicion) {
        const puntos = {
            1: 50, 
            2: 35, 
            3: 25, 
            4: 15,
            5: 10, 
            6: 5
        };
        return puntos[posicion] || 0;
    }
}

let equipos = [];
let numEquipos = 0;
const abecedario = "ABCDEFGHIJKLMNO"; // Letras del abecedario

function iniciar() {
    numEquipos = parseInt(document.getElementById("numEquipos").value);
    if (numEquipos >= 1 && numEquipos <= 15) {
        const form = document.getElementById("equiposForm");
        form.innerHTML = "";  // Limpiar entradas anteriores

        for (let i = 0; i < numEquipos; i++) {
            const equipoDiv = document.createElement("div");
            equipoDiv.className = "equipo";

            // Crear etiqueta con la letra correspondiente
            const letraEquipo = abecedario[i]; // Obtener letra del abecedario
            const nombreLabel = document.createElement("label");
            nombreLabel.textContent = `Equipo ${i + 1} - ${letraEquipo}:`;
            equipoDiv.appendChild(nombreLabel);

            // Input para el nombre del equipo
            const nombreInput = document.createElement("input");
            nombreInput.placeholder = `Nombre del equipo ${letraEquipo}`;
            nombreInput.className = "nombre-equipo"; // Asigna la clase para el nombre del equipo
            equipoDiv.appendChild(nombreInput);

            // Crear un contenedor para las 4 salas (Kills y Tops)
            const salasDiv = document.createElement("div");
            salasDiv.className = "salas";

            for (let j = 0; j < 4; j++) {
                const salaDiv = document.createElement("div");
                salaDiv.className = "sala";

                // Crear inputs para Kills
                const killsLabel = document.createElement("label");
                killsLabel.textContent = `Sala ${j + 1} Kills:`;
                salaDiv.appendChild(killsLabel);

                const killsInput = document.createElement("input");
                killsInput.type = "number"; // Cambiar a number para validar la entrada
                killsInput.placeholder = `Kills Sala ${j + 1}`;
                killsInput.className = "kills-top"; // Asigna la clase para kills
                salaDiv.appendChild(killsInput);

                // Crear inputs para Tops
                const topLabel = document.createElement("label");
                topLabel.textContent = `Top:`;
                salaDiv.appendChild(topLabel);

                const topInput = document.createElement("input");
                topInput.type = "number"; // Cambiar a number para validar la entrada
                topInput.placeholder = `Top Sala ${j + 1} (1-15)`;
                topInput.className = "kills-top"; // Asigna la clase para tops
                salaDiv.appendChild(topInput);

                salasDiv.appendChild(salaDiv);
            }
            
            equipoDiv.appendChild(salasDiv);
            form.appendChild(equipoDiv);
        }
        document.getElementById("resultadosButton").disabled = false;
    } else {
        alert("El número de equipos debe estar entre 1 y 15.");
    }
}


function generarResultados() {
    mostrarSpinner(); // Mostrar el spinner al inicio
    equipos.length = 0;  // Reiniciar el array de equipos
    const inputs = document.querySelectorAll(".equipo");
    inputs.forEach(input => {
        const nombre = input.querySelector("input[placeholder^='Nombre del equipo']").value;
        
        const equipo = new Equipo(nombre);
        for (let j = 0; j < 4; j++) {
            equipo.kills[j] = parseInt(input.querySelector(`input[placeholder='Kills Sala ${j + 1}']`).value) || 0;
            equipo.top[j] = parseInt(input.querySelector(`input[placeholder='Top Sala ${j + 1} (1-15)']`).value) || 0;
        }
        equipo.calcularTotales();
        equipos.push(equipo);
    });

    equipos.sort((a, b) => b.totalPuntaje - a.totalPuntaje);
    equipos.splice(8);  // Limitar a los 8 mejores equipos

    const resultsText = equipos.map(e => `${e.nombre},${e.totalKills},${e.totalTop},${e.totalPuntaje}`).join("\n");
    localStorage.setItem('resultados', resultsText);
    document.getElementById("imagenButton").disabled = false;
    ocultarSpinner(); // Ocultar el spinner al finalizar
}

function crearImagen() {
    mostrarSpinner(); // Mostrar el spinner al inicio
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "Plantilla/Tabla.png";  // Ruta a la imagen de la plantilla

    const font = new FontFace('Impact', 'url(Plantilla/impact.ttf)');
    
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let logosCargados = 0;

            equipos.forEach((equipo, index) => {
                const logo = new Image();
                logo.src = logosPath[equipo.nombre] || "logos/default.png"; 

                logo.onload = function () {
                    ctx.drawImage(logo, ...positions.logo[index], 260, 260);

                    ctx.fillStyle = (index === 0) ? "#fcff37" : "white"; 
                    ctx.font = "95px Impact";
                    ctx.textAlign = "left";
                    ctx.fillText(equipo.nombre, ...positions.equipo[index]);

                    ctx.fillStyle = (index === 0) ? "black" : "white"; 
                    ctx.font = "125px Impact";
                    ctx.textAlign = "center"; 
                    ctx.fillText(equipo.totalKills, positions.kills[index][0], positions.kills[index][1]);
                    ctx.fillText(equipo.totalTop, positions.top[index][0], positions.top[index][1]);
                    ctx.fillText(equipo.totalPuntaje, positions.total[index][0], positions.total[index][1]);

                    logosCargados++;
                    if (logosCargados === equipos.length) {
                        const imgURL = canvas.toDataURL("image/png");
                        const link = document.createElement("a");
                        link.href = imgURL;
                        link.download = "Tabla_Resultados.png";
                        link.click();
                        ocultarSpinner(); // Ocultar el spinner al finalizar
                        clearTimeout(timer); // Cancelar el temporizador si se completó correctamente
                    }
                };
                logo.onerror = function () {
                    ctx.fillStyle = (index === 0) ? "#fcff37" : "white"; 
                    ctx.font = "95px Impact";
                    ctx.textAlign = "left";
                    ctx.fillText(equipo.nombre, ...positions.equipo[index]);

                    ctx.fillStyle = (index === 0) ? "black" : "white"; 
                    ctx.font = "125px Impact"; 
                    ctx.textAlign = "center";
                    ctx.fillText(equipo.totalKills, positions.kills[index][0], positions.kills[index][1]);
                    ctx.fillText(equipo.totalTop, positions.top[index][0], positions.top[index][1]);
                    ctx.fillText(equipo.totalPuntaje, positions.total[index][0], positions.total[index][1]);

                    logosCargados++;
                    if (logosCargados === equipos.length) {
                        const imgURL = canvas.toDataURL("image/png");
                        const link = document.createElement("a");
                        link.href = imgURL;
                        link.download = "Tabla_Resultados.png";
                        link.click();
                        ocultarSpinner(); // Ocultar el spinner al finalizar
                        clearTimeout(timer); // Cancelar el temporizador si se completó correctamente
                    }
                };
            });
        };
        // Establecer un temporizador de 1 minuto para ocultar el spinner si no se ha completado la carga
        const timer = setTimeout(() => {
            ocultarSpinner(); // Ocultar el spinner si hay un fallo
            mostrarError("Ha habido un fallo, Generar y Descargar de nuevo.");
        }, 180000); // 60000 ms = 1 minuto
    }).catch(function(error) {
        console.error("Error loading font: ", error);
    });   
}
// Función para mostrar el mensaje de error
function mostrarError(mensaje) {
    // Obtener o crear el contenedor de mensaje de error
    let errorDiv = document.getElementById("errorMensaje");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "errorMensaje";
        errorDiv.style.position = "fixed";
        errorDiv.style.top = "50%";
        errorDiv.style.left = "50%";
        errorDiv.style.transform = "translate(-50%, -50%)";
        errorDiv.style.backgroundColor = "rgba(255, 0, 0, 0.9)";
        errorDiv.style.color = "white";
        errorDiv.style.padding = "15px 25px";
        errorDiv.style.borderRadius = "8px";
        errorDiv.style.zIndex = "1000";
        errorDiv.style.textAlign = "center";
        errorDiv.style.maxWidth = "90%";
        errorDiv.style.wordWrap = "break-word";
        errorDiv.style.fontSize = "1rem";
        errorDiv.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
        document.body.appendChild(errorDiv);
    }
    
    // Limpiar contenido previo y añadir mensaje nuevo
    errorDiv.innerHTML = ''; // Eliminar contenido previo
    const mensajeTexto = document.createElement("span");
    mensajeTexto.innerText = mensaje;

    // Crear y añadir botón de cerrar
    const cerrarButton = document.createElement("button");
    cerrarButton.innerText = "OK";
    cerrarButton.style.marginTop = "10px";
    cerrarButton.style.padding = "5px 10px";
    cerrarButton.style.border = "none";
    cerrarButton.style.backgroundColor = "#333";
    cerrarButton.style.color = "white";
    cerrarButton.style.borderRadius = "4px";
    cerrarButton.style.cursor = "pointer";
    cerrarButton.onclick = function() {
        errorDiv.style.display = "none"; // Ocultar el mensaje de error al hacer clic
    };

    // Añadir mensaje y botón al contenedor
    errorDiv.appendChild(mensajeTexto);
    errorDiv.appendChild(document.createElement("br")); // Separador
    errorDiv.appendChild(cerrarButton);

    // Mostrar el mensaje de error
    errorDiv.style.display = "block";
}

document.getElementById("iniciarButton").onclick = iniciar;
document.getElementById("resultadosButton").onclick = generarResultados;
document.getElementById("imagenButton").onclick = crearImagen;
