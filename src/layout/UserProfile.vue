<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();
const token = localStorage.getItem('access_token');

onMounted(async () => {
    try {
        const response = await axios.get('https://command-sql-back.onrender.com/usuarios/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { email, nombre, apellido_paterno, apellido_materno, rol } = response.data;
        user.value = { email, nombre, apellido_paterno, apellido_materno, rol };
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
});

const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
};
</script>

<template>
    <div class="user-card">
        <div class="card-header">
            <div class="profile-icon">
                <i class="pi pi-user"></i>
            </div>
        </div>
        <div class="card-body">
            <h2 v-if="user">{{ user.nombre }} {{ user.apellido_paterno }} {{ user.apellido_materno }}</h2>
            <div v-if="user">
                <p class="info"><strong>Email:</strong> {{ user.email }}</p>
            </div>
            <div v-else>
                <p>Cargando información del usuario...</p>
            </div>
            <button class="logout-btn" @click="logout"><i class="pi pi-power-off"></i> Cerrar sesión</button>
        </div>
    </div>
</template>

<style scoped>
.user-card {
    width: 320px;
    background: #0a0a0a; /* 🔹 Fondo negro mate */
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 255, 0, 0.1); /* 🔹 Verde muy sutil */
    overflow: hidden;
    font-family: 'Press Start 2P', monospace; /* estilo retro */
    text-align: center;
    margin: 20px auto;
    transition: transform 0.2s ease-in-out;
    border: 1px solid #1a1a1a; /* 🔹 Borde gris oscuro, NO blanco */
}

.user-card:hover {
    transform: translateY(-3px);
}

/* 🔹 Encabezado sin degradado */
.card-header {
    background: #0a0a0a;
    padding: 20px 0;
}

.profile-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #111;
    color: #0f0; /* Verde discreto */
    font-size: 2.5rem;
    border: 2px solid #0f0;
}

.card-body {
    padding: 15px;
}

.card-body h2 {
    margin: 10px 0;
    font-size: 1em;
    font-weight: bold;
    color: #e0e0e0; /* Blanco suave */
}

.card-body .info {
    margin: 5px 0;
    font-size: 0.9em;
    color: #aaa; /* Gris claro */
}

.card-body strong {
    color: #0f0; /* Verde retro */
}

.logout-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 8px 16px;
    background-color: #111;
    color: #0f0;
    font-size: 0.8em;
    border: 1px solid #0f0;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 12px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.logout-btn i {
    font-size: 1em;
}

.logout-btn:hover {
    background-color: #0f0;
    color: #111;
}
</style>
