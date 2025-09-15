<script setup>
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '@fontsource/press-start-2p';
import bg from '@/assets/login.png';

const { setToken } = useAuth();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false); // nuevo
const router = useRouter();

const handleLogin = async () => {
    errorMessage.value = '';
    loading.value = true; // activa el spinner

    if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = 'Cadete, completa todos los campos.';
        loading.value = false;
        return;
    }

    try {
        const formData = new URLSearchParams();
        formData.append('username', email.value.trim());
        formData.append('password', password.value.trim());

        const loginResponse = await axios.post('https://command-sql-back.onrender.com/auth/login', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const { access_token } = loginResponse.data;
        setToken(access_token);
        router.push('/empezar');
    } catch (error) {
        if (error.response) {
            errorMessage.value = error.response.data.detail || 'Houston, tenemos un error de autenticación.';
        } else {
            errorMessage.value = 'Ups, Houston hubo error en la conexión. Intenta más tarde.';
        }
    } finally {
        loading.value = false; // desactiva el spinner
    }
};
</script>

<template>
    <div class="relative w-full min-h-screen bg-black font-press flex items-center justify-center overflow-hidden">
        <!-- Fondo -->
        <img :src="bg" alt="background" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Contenedor principal -->
        <div class="relative z-10 flex flex-col items-center w-full max-w-3xl px-6">
            <div class="mb-10 text-center">
                <h2 class="typing text-green-500 text-4xl md:text-6xl lg:text-8xl font-['Press_Start_2P'] drop-shadow-[0_0_20px_#15ff73]">SELECT * FROM SQL;</h2>
            </div>

            <!-- Recuadro de login -->
            <div class="backdrop-blur-xl rounded-2xl border-4 border-green-500 bg-black/70 shadow-lg shadow-green-500/40 w-full py-12 px-8 space-y-6">
                <h1 class="text-center text-3xl md:text-4xl font-['Press_Start_2P'] text-green-500 drop-shadow-[0_0_15px_#15ff73] mb-6">INICIO DE SESIÓN</h1>

                <div class="space-y-4">
                    <input v-model="email" type="text" placeholder="Email" class="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-['Press_Start_2P']" />

                    <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-['Press_Start_2P']" />
                </div>

                <!-- Botones -->
                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        @click="handleLogin"
                        :disabled="loading"
                        class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-black text-base font-['Press_Start_2P'] rounded-xl shadow-lg shadow-green-400/40 hover:bg-green-600 hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        @click="() => router.push('/register')"
                        class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white text-base font-['Press_Start_2P'] rounded-xl shadow-lg hover:bg-gray-600 hover:scale-105 transition-all"
                    >
                        Registrarse
                    </button>
                </div>

                <!-- Error -->
                <div v-if="errorMessage" class="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
                    🚨
                    {{ errorMessage }}
                </div>
            </div>
        </div>

        <!-- Overlay de carga -->
        <div v-if="loading" class="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <div class="flex flex-col items-center gap-4">
                <svg class="animate-spin h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span class="text-green-500 font-['Press_Start_2P']">Cargando...</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes typing {
    0% {
        width: 0ch;
    }
    50% {
        width: 17ch;
    }
    100% {
        width: 0ch;
    }
}

@keyframes blink {
    50% {
        border-color: transparent;
    }
}

.typing {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    border-right: 4px solid #15ff73;
    font-size: clamp(1.5rem, 5vw, 4rem);
    animation: typing 8s steps(17, end) infinite, blink 1s step-end infinite;
}
</style>
