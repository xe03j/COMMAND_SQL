<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import '@fontsource/press-start-2p';
import soundWin from '@/assets/soundWin.mp3';
import router from '@/router';
import bS from '@/assets/soundm1.mp3'; // audio

const comando = ref('');
const output = ref([]);
const feedback = ref([]);
const intentos = ref(0);

const misionActual = ref('');
const consultaCorrecta = ref('');
const completada = ref(false);
const mostrarPopup = ref(false); // popup felicitación
const usuarioId = ref(null); // se obtiene con /me
const nivelTitulo = ref('');

const normalizar = (str) => str.trim().replace(/\s+/g, ' ').toLowerCase();

const pistas = ['💡 Pista: Revisa las mayúsculas.', '💡 Pista: Cuidado con los espacios extras.', '💡 Pista: Verifica las palabras clave en tu manual.', '💡 Pista: Checa los símbolos como `;` al final.'];

const ejecutarComando = async () => {
    if (completada.value) {
        feedback.value.push({ tipo: 'warning', msg: '⚠️ Ya completaste esta misión, pasa a la siguiente.' });
        comando.value = '';
        return;
    }

    intentos.value++;
    output.value.push(`> ${comando.value}`);

    if (normalizar(comando.value) === normalizar(consultaCorrecta.value)) {
        // Consola estilo SQL engine
        output.value.push('Consulta aceptada...');
        output.value.push('Creando base de datos...');
        output.value.push('Operación completada ✔');
        output.value.push("Database 'nave_estrella' created successfully.");

        feedback.value.push({ tipo: 'success', msg: '🎉 Éxito: Comando ejecutado correctamente 🚀' });
        completada.value = true;
        mostrarPopup.value = true; // activa modal

        if (winSound) {
            winSound.currentTime = 0;
            winSound.play().catch((err) => console.warn('Autoplay bloqueado:', err));
        }
        setTimeout(() => {
            mostrarPopup.value = false;
            router.push({ path: `/mision/3` }); // 👈 solo esto
        }, 2500);

        try {
            const token = localStorage.getItem('access_token');

            // 1️⃣ Guardar progreso (suma XP en el backend si es la primera vez)
            await fetch('https://command-sql-back.onrender.com/progreso/saveprogres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_usuario: usuarioId.value,
                    id_mision: 2, // 👈 misión actual
                    estado: 'completada',
                    intentos: intentos.value
                })
            });

            // 2️⃣ Asignar logro (ejemplo: logro id=1 para primera misión)
            await fetch('https://command-sql-back.onrender.com/logros/logrousuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_usuario: usuarioId.value,
                    id_logro: 2
                })
            });
        } catch (err) {
            console.error('❌ Error al guardar progreso/logro/xp:', err);
        }
    } else {
        // Mostrar pistas cada intento en orden
        const pistaIndex = (intentos.value - 1) % pistas.length;
        feedback.value.push({ tipo: 'error', msg: '❌ Comando incorrecto, intenta de nuevo.' });
        feedback.value.push({ tipo: 'warning', msg: pistas[pistaIndex] });
    }

    comando.value = '';
};

let winSound = null;
let audio = null;

// Cargar misión actual y usuario al montar
onMounted(async () => {
    audio = new Audio(bS);
    audio.loop = true;
    audio.volume = 0.4; //
    audio.play().catch((err) => {
        console.warn('El navegador bloqueó autoplay, se necesita interacción:', err);
    });

    winSound = new Audio(soundWin);
    winSound.volume = 0.7; // volumen moderado
    try {
        const token = localStorage.getItem('access_token');

        // 🔑 Obtener usuario
        const resUser = await fetch('https://command-sql-back.onrender.com/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!resUser.ok) throw new Error('Error al obtener usuario');
        const userData = await resUser.json();
        usuarioId.value = userData.id_usuario;

        // 📘 Obtener misión
        const resMision = await fetch('https://command-sql-back.onrender.com/misiones/2', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!resMision.ok) throw new Error('Error al obtener misión');
        const data = await resMision.json();

        // 📘 Obtener nivel con el id_nivel de la misión
        const resNivel = await fetch(`https://command-sql-back.onrender.com/niveles/2`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!resNivel.ok) throw new Error('Error al obtener nivel');
        const nivelData = await resNivel.json();

        // 🔗 Concatenar enunciados
        nivelTitulo.value = nivelData.titulo;
        misionActual.value = nivelData.descripcion;
        consultaCorrecta.value = data.consulta_correcta;
    } catch (err) {
        console.error(err);
        feedback.value.push({ tipo: 'error', msg: '❌ No se pudo cargar misión o usuario.' });
    }
});

onBeforeUnmount(() => {
    if (audio) {
        audio.pause();
        audio = null;
    }
});
</script>

<template>
    <div :class="$style.mainscreen">
        <!-- Fondo -->
        <div :class="$style.background">
            <img src="@/assets/16.png" alt="Fondo" class="absolute inset-0 w-full h-full object-cover" />
            <div :class="$style.overlay"></div>
        </div>

        <!-- Contenedor principal -->
        <div :class="$style.cardParent">
            <div :class="$style.card">
                <div :class="$style.commandSql">MISION 2 — {{ nivelTitulo }}</div>
            </div>

            <!-- Misiones -->
            <div :class="$style.overlayborder3">
                <div :class="$style.mainscreenHeading3margin">
                    <div :class="$style.heading3">
                        <div :class="$style.margin">
                            <div :class="$style.terminal">assignment</div>
                        </div>
                        <div :class="$style.consolaDeComandos">Misiones y Objetivos</div>
                    </div>
                </div>
                <div :class="$style.container7">
                    <div :class="$style.overlayborder4">
                        <div :class="$style.container">
                            <b :class="$style.misinActualNavegacin">{{ misionActual }}</b>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Terminal de entrada -->
            <div :class="$style.overlayborder">
                <div :class="$style.heading3margin">
                    <div :class="$style.heading3">
                        <div :class="$style.margin">
                            <div :class="$style.terminal">terminal</div>
                        </div>
                        <div :class="$style.consolaDeComandos">Consola de Comandos</div>
                    </div>
                </div>
                <div :class="$style.mainscreenMargin">
                    <div :class="$style.mainscreenContainer">
                        <div :class="$style.input">
                            <input v-model="comando" type="text" placeholder="Escribe tu comando SQL aquí..." :class="$style.escribeTuComando" @keyup.enter="ejecutarComando" />
                        </div>
                        <div :class="$style.button" @click="ejecutarComando">
                            <b :class="$style.terminal">Ejecutar</b>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Output del sistema -->
            <div :class="$style.mainscreenOverlayborder">
                <div :class="$style.mainscreenHeading3margin">
                    <div :class="$style.heading3">
                        <div :class="$style.margin">
                            <div :class="$style.terminal">dns</div>
                        </div>
                        <div :class="$style.consolaDeComandos">Output del Sistema</div>
                    </div>
                </div>
                <div :class="$style.background2">
                    <div :class="$style.scrollContainer">
                        <div class="selectFrom">Ejecutando consulta...</div>
                        <div v-for="line in output" :key="line" class="mainscreenP">{{ line }}</div>
                    </div>
                </div>
            </div>

            <!-- Feedback -->
            <div :class="$style.overlayborder2">
                <div :class="$style.mainscreenHeading3margin">
                    <div :class="$style.heading3">
                        <div :class="$style.margin">
                            <div :class="$style.terminal">feedback</div>
                        </div>
                        <div :class="$style.consolaDeComandos">Feedback y Alertas</div>
                    </div>
                </div>
                <div :class="$style.scrollContainer">
                    <div v-for="(alerta, i) in feedback" :key="i" :class="[alerta.tipo === 'success' ? $style.overlayverticalborder : alerta.tipo === 'warning' ? $style.mainscreenOverlayverticalborder : $style.overlayverticalborder2]">
                        <div :class="$style.container">
                            <div :class="$style.xitoComandoEjecutadoContainer">{{ alerta.msg }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- POPUP FELICITACIÓN -->
    <div v-if="mostrarPopup" :class="$style.popupOverlay">
        <div :class="$style.popup">
            <h2>🎉 ¡Misión completada!</h2>
            <p>Has superado esta misión con éxito, adelante cadete..</p>
            <button :class="$style.closeButton" @click="mostrarPopup = false">Cerrar</button>
        </div>
    </div>
</template>

<style module>
/* --------------------------
   Layout general / fix grid
   -------------------------- */
.mainscreen {
    position: relative;
    width: 100%;
    height: 100vh;
    font-family: 'Press Start 2P', cursive;
    color: #15ff73;
    overflow: hidden;
}

.background {
    position: fixed;
    inset: 0;
    z-index: -3;
}

.background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: -2;
}

/* Planeta lateral */
.pngwing2Icon {
    position: fixed;
    right: -300px;
    top: 50%;
    transform: translateY(-50%);
    width: 1400px;
    opacity: 0.95;
    z-index: -1;
    pointer-events: none;
}

/* Grid padre responsive */
.cardParent {
    display: grid;
    grid-template-columns: 1fr 1fr; /* por defecto 2 columnas */
    grid-auto-rows: min-content;
    gap: 20px;
    padding: 24px;
    align-items: start;
    align-content: start;
    min-height: calc(100vh - 24px);
}

/* Cabecera tarjeta "MISION 1" */
.card {
    grid-column: 1 / -1;
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid #15ff73;
    border-radius: 12px;
    padding: 8px 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 64px;
    height: auto;
}

/* Títulos escalables */
.commandSql {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    color: #15ff73;
    text-shadow: 0 0 12px #15ff73, 0 0 24px #15ff73;
    letter-spacing: 4px;
    text-align: center;
    margin: 0;
}

.consolaDeComandos {
    font-weight: bold;
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: white;
}

/* Tarjetas contenedoras */
.overlayborder,
.mainscreenOverlayborder,
.overlayborder2,
.overlayborder3,
.overlayborder4 {
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid #15ff73;
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 0 15px rgba(21, 255, 115, 0.4);
    min-height: 80px;
}

/* Scroll interno */
.scrollContainer {
    max-height: 260px;
    overflow-y: auto;
    word-break: break-word;
    padding-right: 8px;
}

/* Scroll estilo neón */
.scrollContainer::-webkit-scrollbar {
    width: 12px;
}

.scrollContainer::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.25);
    border-radius: 8px;
}

.scrollContainer::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(21, 255, 115, 0.9), rgba(21, 255, 115, 0.6));
    border-radius: 8px;
    border: 2px solid rgba(0, 0, 0, 0.4);
}

/* Feedback */
.overlayverticalborder {
    border-left: 4px solid #15ff73;
    padding-left: 10px;
    margin: 6px 0;
    color: #15ff73;
}

.mainscreenOverlayverticalborder {
    border-left: 4px solid #ffe600;
    padding-left: 10px;
    margin: 6px 0;
    color: #ffe600;
    text-shadow: 0 0 6px #ffe600;
}

.overlayverticalborder2 {
    border-left: 4px solid #ff3030;
    padding-left: 10px;
    margin: 6px 0;
    color: #ff3030;
    text-shadow: 0 0 8px #ff3030;
}

/* Input + botón responsivos */
.mainscreenContainer {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap; /* botón baja si no cabe */
    width: 100%; /* ocupa todo el ancho del contenedor */
    box-sizing: border-box;
}

.escribeTuComando {
    width: 100%; /* ocupa todo el espacio posible */
    max-width: 500px; /* no crezca demasiado en desktop */
    min-width: 150px; /* no se achique demasiado en mobile */
    flex-grow: 1;
    box-sizing: border-box;
    border: 2px solid white; /* marco blanco */
    border-radius: 6px; /* esquinas redondeadas */
    background: black; /* fondo negro */
    color: #15ff73; /* texto verde estilo neón */
    padding: 12px 14px; /* mantiene el padding original */
}

.button {
    background: #444;
    color: white;
    padding: 10px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9rem;
    transition: 0.25s;
    border: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    flex-shrink: 0; /* no se achica, baja a otra línea si no cabe */
}

.button:hover {
    background: #15ff73;
    color: black;
    box-shadow: 0 0 18px rgba(21, 255, 115, 0.9);
}

/* Misiones texto */
.misinActualNavegacin {
    font-size: clamp(0.9rem, 2vw, 1.1rem); /* tamaño adaptable */
    color: white;

    word-break: break-word; /* evita desbordamiento */
}

.terminal {
    font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    text-transform: uppercase;
    color: #15ff73;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.selectFrom {
    font-family: monospace;
    font-size: 0.95rem;
}

.mainscreenMargin {
    margin-top: 10px;
}

.mainscreenP {
    font-family: monospace;
    font-size: 0.9rem;
    color: #ccc;
}

.overlayborder,
.overlayborder2,
.mainscreenOverlayborder,
.overlayborder3,
.overlayborder4 {
    min-width: 0;
    min-height: 0;
}

/* Popup felicitación */
.popupOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    backdrop-filter: blur(4px);
}

.popup {
    background: linear-gradient(145deg, #121212 0%, #1a1a1a 100%);
    border: 2px solid #4caf50;
    border-radius: 15px;
    padding: 40px 30px;
    text-align: center;
    color: #c8f5d4;
    text-shadow: 0 0 5px #4caf50;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.5), inset 0 0 10px rgba(76, 175, 80, 0.2);
    animation: popupIn 0.4s ease-out;
    max-width: 600px;
    width: 85%;
}

.popup h2 {
    font-size: clamp(1.6rem, 4.5vw, 2rem);
    margin-bottom: 20px;
    letter-spacing: 1.5px;
    color: #a8f0b1;
    text-shadow: 0 0 4px #4caf50;
}

.popup p {
    font-size: clamp(0.95rem, 2.5vw, 1.2rem);
    margin-bottom: 15px;
    color: #c8f5d4;
    text-shadow: 0 0 3px #4caf50;
}

.closeButton {
    margin-top: 20px;
    background: #4caf50;
    border: none;
    padding: 12px 25px;
    font-family: 'Press Start 2P';
    font-size: 0.9rem;
    border-radius: 8px;
    cursor: pointer;
    color: #121212;
    box-shadow: 0 0 10px #4caf50 inset;
    transition: all 0.2s ease-in-out;
}

.closeButton:hover {
    background: #67d473;
    color: #121212;
    box-shadow: 0 0 15px #67d473 inset;
    transform: scale(1.03);
}

@keyframes popupIn {
    from {
        transform: scale(0.6);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* --------------------------
   Media Queries
   -------------------------- */
@media (max-width: 768px) {
    .cardParent {
        padding: 12px;
        gap: 12px;
    }

    .escribeTuComando {
        max-width: 100%;
    }

    .mainscreenContainer {
        gap: 8px;
    }
}

@media (max-width: 360px) {
    .cardParent {
        grid-template-columns: 1fr;
        padding: 12px;
        gap: 12px;
    }

    .commandSql {
        font-size: 1.5rem;
    }

    .misinActualNavegacin {
        font-size: 0.9rem;
    }

    .escribeTuComando {
        max-width: 100%; /* input ocupa todo el ancho disponible */
    }

    .mainscreenContainer {
        gap: 8px; /* reduce espacio entre input y botón */
    }

    .consolaDeComandos {
        font-size: 0.85rem;
    }

    .terminal {
        font-size: 0.75rem;
    }

    .popup {
        padding: 20px;
    }

    .popup h2 {
        font-size: 1.2rem;
    }
}
</style>
