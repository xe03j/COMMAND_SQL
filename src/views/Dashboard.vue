<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import image6 from '@/assets/dashbg.png';
import bS from '@/assets/bS.mp3'; // audio

const niveles = ref([]);
const usuario = ref(null);
const progreso = ref(0);

const token = localStorage.getItem('access_token');

const ordenDificultad = ['Fácil', 'Medio', 'Difícil', 'Experto'];

const obtenerNiveles = async () => {
    try {
        const response = await axios.get('https://command-sql-back.onrender.com/niveles/ver', {
            headers: { Authorization: `Bearer ${token}` }
        });
        niveles.value = response.data.sort((a, b) => {
            return ordenDificultad.indexOf(a.dificultad) - ordenDificultad.indexOf(b.dificultad);
        });
    } catch (error) {
        console.error('Error al obtener niveles:', error);
    }
};

const obtenerUsuario = async () => {
    try {
        const response = await axios.get('https://command-sql-back.onrender.com/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        usuario.value = response.data;

        // calcular progreso con base en 96 xp = 100%
        progreso.value = Math.min((usuario.value.xp_total / 96) * 100, 100);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
    }
};

let audio;

onMounted(() => {
    obtenerNiveles();
    obtenerUsuario();
    audio = new Audio(bS);
    audio.loop = true;
    audio.volume = 0.4; //
    audio.play().catch((err) => {
        console.warn('El navegador bloqueó autoplay, se necesita interacción:', err);
    });
});

onBeforeUnmount(() => {
    if (audio) {
        audio.pause();
        audio = null;
    }
});
</script>

<template>
    <div class="niveles-container">
        <!-- Fondo -->

        <div class="background">
            <img :src="image6" alt="Fondo" />
            <div class="overlay"></div>
        </div>

        <!-- Contenido -->
        <h1 class="titulo md:text-7xl">Panel de Control</h1>
        <p class="intro">Bienvenido cadete, aquí tienes los niveles y tu progreso.</p>

        <!-- 🟢 Barra de progreso -->
        <div v-if="usuario" class="progress-container">
            <span class="progress-text">🚀 Progreso de juego: {{ Math.floor(progreso) }}%</span>
            <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progreso + '%' }"></div>
            </div>
        </div>
        <div class="grid">
            <div v-for="nivel in niveles" :key="nivel.id_nivel" class="card" :class="nivel.dificultad.toLowerCase()">
                <h2 class="nivel-titulo">{{ nivel.titulo }}</h2>
                <p class="nivel-descripcion">{{ nivel.descripcion }}</p>

                <div class="info">
                    <span class="tag">🎯 {{ nivel.tema_sql }}</span>
                    <span class="dificultad" :class="nivel.dificultad.toLowerCase()">⚡ {{ nivel.dificultad }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.niveles-container {
    position: relative;
    min-height: 100vh;
    padding: 2rem;
    font-family: 'Press Start 2P', sans-serif;
    text-align: center;
    color: #fff;
    z-index: 10;
}

.background {
    position: fixed;
    inset: 0;
    z-index: -1;
}

.background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
}

.titulo {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: #15ff73;
    text-shadow: 0 0 12px #15ff73, 0 0 25px #00ff66;
}

.intro {
    font-size: 1rem;
    margin-bottom: 2rem;
    max-width: 900px;
    margin-inline: auto;
    line-height: 1.8;
    color: #ffffff;
}

/* Barra de progreso */
.progress-container {
    margin: 1.5rem auto 3rem;
    max-width: 500px;
    text-align: left;
}

.progress-text {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    color: #15ff73;
    text-shadow: 0 0 10px #15ff73;
}

.progress-bar {
    width: 100%;
    height: 18px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(21, 255, 115, 0.3);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #15ff73, #00ffcc);
    transition: width 0.4s ease;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

/* Base */
.card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
}

.card:hover {
    transform: translateY(-5px) scale(1.03);
}

.card.fácil {
    border: 2px solid #22c55e; /* verde */
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
}

.card.medio {
    border: 2px solid #3b82f6; /* azul */
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.card.difícil {
    border: 2px solid #f97316; /* naranja */
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.5);
}

.card.experto {
    border: 2px solid #ef4444; /* rojo */
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
}

.nivel-titulo {
    font-size: 16px;
    margin-bottom: 1rem;
    color: #15ff73;
}

.nivel-descripcion {
    font-size: 12px;
    line-height: 1.4rem;
    margin-bottom: 1rem;
}

.info {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
}

.tag {
    background: #1e293b;
    padding: 0.3rem 0.6rem;
    border-radius: 8px;
    color: #38bdf8;
}

.dificultad {
    color: #facc15;
}

/* Base texto */
.dificultad {
    font-weight: bold;
    text-transform: uppercase;
}

/* Colores para texto de dificultad */
.dificultad.fácil {
    color: #22c55e; /* verde */
}

.dificultad.medio {
    color: #3b82f6; /* azul */
}

.dificultad.difícil {
    color: #f97316; /* naranja */
}

.dificultad.experto {
    color: #ef4444; /* rojo */
}
</style>
