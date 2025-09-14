<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import image6 from '@/assets/empbg.png';
import startSound from '@/assets/iniciarSound.mp3';
import typeSound from '@/assets/typewriter.mp3'; // 🎹 sonido máquina de escribir
import '@fontsource/press-start-2p';

const router = useRouter();

const storyText = [
    'Bitácora de la misión Aurora, día 37.',
    'Aquí el Líder Rojo reportando. Nuestra nave ha quedado varada en medio del espacio… los motores fallaron y la energía se apagó. La tripulación está en riesgo.',
    'Intentamos todas las soluciones conocidas… pero nada funcionó.',
    'Solo queda una opción: los sistemas de la nave responden únicamente a comandos SQL.',
    'Y si no aprendemos a dominarlos, nunca lograremos volver a casa.'
];

const currentLine = ref('');
const lineIndex = ref(0);
const charIndex = ref(0);
const finished = ref(false);
const isTyping = ref(true);
const lastTimeout = ref(null);

const audioRef = ref(null); // para sonido start
let typingAudio = null; // audio de tecleo

const typingSpeed = 40; // ms por carácter
const lineDelay = 1000; // ms entre líneas

// reproducir audio loop mientras se escribe un bloque
function startTypingSound() {
    stopTypingSound();
    typingAudio = new Audio(typeSound);
    typingAudio.loop = true;
    typingAudio.volume = 0.4;
    typingAudio.play().catch(() => {});
}

function stopTypingSound() {
    if (typingAudio) {
        typingAudio.pause();
        typingAudio.currentTime = 0;
        typingAudio = null;
    }
}

function clearPending() {
    if (lastTimeout.value) {
        clearTimeout(lastTimeout.value);
        lastTimeout.value = null;
    }
}

function typeNextChar() {
    if (!isTyping.value) return;
    if (lineIndex.value >= storyText.length) {
        finished.value = true;
        isTyping.value = false;
        stopTypingSound(); // detener si ya terminó toda la historia
        return;
    }

    const line = storyText[lineIndex.value];

    if (charIndex.value === 0) {
        // 🚀 arranca sonido al inicio del bloque
        startTypingSound();
    }

    if (charIndex.value < line.length) {
        currentLine.value += line[charIndex.value];
        charIndex.value++;
        lastTimeout.value = setTimeout(typeNextChar, typingSpeed);
    } else {
        // fin de línea → parar audio
        stopTypingSound();

        lastTimeout.value = setTimeout(() => {
            currentLine.value += '\n\n';
            lineIndex.value++;
            charIndex.value = 0;
            typeNextChar();
        }, lineDelay);
    }
}

onMounted(() => {
    typeNextChar();
});

onBeforeUnmount(() => {
    clearPending();
    stopTypingSound();
});

/**
 * Reproduce sonido y navega (sin recargar)
 */
const startGame = async () => {
    try {
        audioRef.value = new Audio(startSound);
        audioRef.value.volume = 1;
        audioRef.value.play().catch(() => {});
    } catch (e) {
        console.warn('No se pudo crear audio:', e);
    }

    try {
        await router.push('/dashboard');
    } catch (err) {
        console.warn('router.push falló:', err);
    }
};

/**
 * Skip: cancelar la escritura y navegar inmediatamente
 */
const skipStory = () => {
    clearPending();
    stopTypingSound();
    isTyping.value = false;
    startGame();
};
</script>

<template>
    <div class="relative w-full min-h-screen bg-black text-green-400 font-['Press_Start_2P',monospace] overflow-hidden flex flex-col items-center justify-center px-4" style="user-select: text">
        <!-- Fondo -->
        <img :src="image6" alt="Fondo" class="absolute inset-0 w-screen h-screen object-cover opacity-80 pointer-events-none z-0" />

        <!-- Overlay oscuro -->
        <div class="absolute inset-0 bg-black/50 pointer-events-none z-5"></div>

        <!-- Texto -->
        <div class="relative z-20 w-full max-w-4xl text-left whitespace-pre-wrap leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl tracking-wide px-6">
            {{ currentLine }}
        </div>

        <!-- Skip -->
        <button v-if="isTyping" @click="skipStory" class="absolute bottom-4 right-4 z-40 font-bold rounded-lg shadow-md transition-transform bg-gradient-to-r from-green-500 to-green-700 text-black px-4 py-2 border-2 border-green-400">Skip »</button>

        <!-- Botón grande EMPEZAR -->
        <button
            v-if="finished"
            @click="startGame"
            class="mt-12 z-40 rounded-2xl shadow-lg transition-transform bg-gradient-to-r from-green-400 to-green-600 text-black px-12 py-6 text-xl border-4 border-green-300 tracking-widest hover:scale-110 hover:shadow-green-400/50"
        >
            ▶ EMPEZAR ◀
        </button>
    </div>
</template>

<style scoped>
button:hover {
    transform: translateY(-3px) scale(1.02);
}

@media (min-width: 768px) {
    button[aria-label='Empezar misión'] {
        font-size: 1.35rem;
        padding: 1.4rem 4rem;
    }
}
</style>
