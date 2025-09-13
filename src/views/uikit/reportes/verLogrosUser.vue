<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import image6 from '@/assets/dashbg.png';
import bS from '@/assets/bS.mp3'; // audio

const usuario = ref(null);
const logros = ref([]);
const estadisticas = ref([]);

const token = localStorage.getItem('access_token');

const obtenerUsuario = async () => {
    try {
        const response = await axios.get('https://command-sql-back.onrender.com/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        usuario.value = response.data;

        // luego que tenemos id_usuario, traemos logros y estadísticas
        obtenerLogros(usuario.value.id_usuario);
        obtenerEstadisticas(usuario.value.id_usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
    }
};

const obtenerLogros = async (id_usuario) => {
    try {
        const response = await axios.get(`https://command-sql-back.onrender.com/logros/usuario/${id_usuario}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        logros.value = response.data;
    } catch (error) {
        console.error('Error al obtener logros:', error);
    }
};

const obtenerEstadisticas = async (id_usuario) => {
    try {
        const response = await axios.get(`https://command-sql-back.onrender.com/progreso/usuario/${id_usuario}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        estadisticas.value = response.data;
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
    }
};

let audio = null;

onMounted(() => {
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

        <h1 class="titulo md:text-7xl">Aqui estan tus stats</h1>
        <p class="intro">Cadete, aquí tienes tus medallas y tu desempeño.</p>
        <!-- Logros -->
        <div v-if="usuario" class="seccion">
            <h2 class="subtitulo logros-title">🏅 Estos son tus logros {{ usuario.email }}</h2>
            <div class="grid">
                <div v-for="logro in logros" :key="logro.id_logro" class="card card-logro">
                    <h3 class="card-title">{{ logro.nombre }}</h3>
                    <p class="card-desc">{{ logro.descripcion }}</p>
                </div>
            </div>
        </div>

        <!-- Estadísticas -->
        <div v-if="usuario" class="seccion">
            <h2 class="subtitulo stats-title">Estadísticas de tus misiones</h2>
            <div class="grid">
                <div v-for="stat in estadisticas" :key="stat.id_progreso" class="card card-stats">
                    <h3 class="card-title">Misión #{{ stat.id_mision }}</h3>
                    <p class="card-desc">Intentos: {{ stat.intentos }}</p>
                    <p class="card-desc">Completada: {{ new Date(stat.fecha_completado).toLocaleString() }}</p>
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

.seccion {
    margin-bottom: 3rem;
}

.subtitulo {
    font-size: 1.4rem;
    margin-bottom: 4rem;
    text-shadow: 0 0 12px #15ff73, 0 0 20px #15ff73;
}

.logros-title {
    color: #15ff73;
}

.stats-title {
    color: #ffffff;
    text-shadow: 0 0 12px #ffffff, 0 0 20px #15ff73;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.card {
    border-radius: 15px;
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Tarjetas de logros */
.card-logro {
    background: rgba(21, 255, 115, 0.1);
    border: 2px solid #15ff73;
    box-shadow: 0 0 20px rgba(21, 255, 115, 0.4);
    text-align: left;
}

.card-logro:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 0 25px rgba(21, 255, 115, 0.7);
}

/* Tarjetas de estadísticas */
.card-stats {
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid #ffffff55;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    text-align: left;
}

.card-stats:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
}

.card-title {
    font-size: 16px;
    margin-bottom: 1rem;
    color: #15ff73;
}

.card-desc {
    font-size: 12px;
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
}
</style>
