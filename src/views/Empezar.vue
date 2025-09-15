<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import image6 from '@/assets/empbg.png';
import startSound from '@/assets/iniciarSound.mp3';
import typeSound from '@/assets/typewriter.mp3';
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

let typingAudio = null;
let typingTimer = null; // control del loop manual
const typingSpeed = 40;
const lineDelay = 1000;

// --- Audio setup ---
// Pre-cargar audio (no se reproducirá hasta que el user interactúe)
onMounted(() => {
    typingAudio = new Audio(typeSound);
    typingAudio.volume = 0.5;
    typingAudio.preload = 'auto';
});

function startTypingSound() {
    stopTypingSound();
    if (!typingAudio) return;

    typingAudio.currentTime = 0;
    typingAudio.play().catch(() => {});

    // 🚀 "Loop manual" para móviles (reinicia antes de acabar)
    typingTimer = setInterval(() => {
        if (typingAudio && typingAudio.currentTime > typingAudio.duration - 0.2) {
            typingAudio.currentTime = 0;
            typingAudio.play().catch(() => {});
        }
    }, 200);
}

function stopTypingSound() {
    if (typingAudio) {
        typingAudio.pause();
        typingAudio.currentTime = 0;
    }
    if (typingTimer) {
        clearInterval(typingTimer);
        typingTimer = null;
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
        stopTypingSound();
        return;
    }

    const line = storyText[lineIndex.value];

    if (charIndex.value === 0) {
        startTypingSound();
    }

    if (charIndex.value < line.length) {
        currentLine.value += line[charIndex.value];
        charIndex.value++;
        lastTimeout.value = setTimeout(typeNextChar, typingSpeed);
    } else {
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

const startGame = async () => {
    try {
        const audio = new Audio(startSound);
        audio.volume = 1;
        await audio.play().catch(() => {});
    } catch (error) {
        console.error('Error en el starsound', error);
    }
    await router.push('/dashboard');
};

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
