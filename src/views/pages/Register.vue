<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import '@fontsource/press-start-2p';
import bg from '@/assets/login.png';


const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);
const router = useRouter();

// 🔹 Lista de dominios comunes válidos
const dominiosValidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'protonmail.com', 'icloud.com', 'live.com', 'aol.com'];

const handleRegister = async () => {
    errorMessage.value = '';
    successMessage.value = '';
    loading.value = true; // activa spinner

    if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = 'Cadete, completa todos los campos.';
        loading.value = false;
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        errorMessage.value = 'Cadete, ingresa un correo válido.';
        loading.value = false;
        return;
    }

    // 🔹 Validar dominio del correo
    const dominio = email.value.trim().split('@')[1];
    if (!dominiosValidos.includes(dominio)) {
        errorMessage.value = `Cadete, el dominio "${dominio}" no es reconocido como válido.`;
        loading.value = false;
        return;
    }

    // 🔹 Validar longitud mínima de contraseña
    if (password.value.trim().length < 8) {
        errorMessage.value = 'Cadete, la contraseña debe tener al menos 8 caracteres.';
        loading.value = false;
        return;
    }

    try {
        const response = await axios.post('https://command-sql-back.onrender.com/auth/register', {
            email: email.value.trim(),
            password: password.value.trim()
        });

        if (response.status === 200) {
            successMessage.value = '✅ Registro exitoso, inicia sesión ahora.';
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
    } catch (error) {
        if (error.response) {
            errorMessage.value = error.response.data.detail || 'Houston, no se pudo registrar.';
        } else {
            errorMessage.value = 'Ups, Houston hubo error en la conexión. Intenta más tarde.';
        }
    } finally {
        loading.value = false; // desactiva spinner
    }
};
</script>

<template>
    <div class="relative w-full min-h-screen bg-black font-press flex items-center justify-center overflow-hidden">
        <!-- Fondo -->
        <img :src="bg" alt="background" class="absolute inset-0 w-full h-full object-cover" />

        <div class="relative z-10 flex flex-col items-center w-full max-w-3xl px-6">
            <div class="mb-10 text-center">
                <h2 class="typing text-green-400 text-4xl md:text-6xl lg:text-8xl font-['Press_Start_2P'] drop-shadow-[0_0_20px_#15ff73]">CREATE USER;</h2>
            </div>

            <div class="backdrop-blur-xl rounded-2xl border-4 border-green-400 bg-black/70 shadow-lg shadow-green-500/40 w-full py-12 px-8 space-y-6">
                <h1 class="text-center text-3xl md:text-4xl font-['Press_Start_2P'] text-green-400 drop-shadow-[0_0_15px_#15ff73] mb-6">REGISTRO</h1>
                <p class="text-center text-sm md:text-base text-green-300 font-['Press_Start_2P'] mb-4">Cadete, ingresa un correo válido y una contraseña para unirte a la misión.</p>

                <div class="space-y-4">
                    <input v-model="email" type="text" placeholder="email@example.dominio" class="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-['Press_Start_2P']" />
                    <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 font-['Press_Start_2P']" />
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        @click="handleRegister"
                        :disabled="loading"
                        class="flex-1 flex items-center justify-center gap-2 h-14 px-6 bg-green-500 text-black text-lg font-['Press_Start_2P'] rounded-xl shadow-lg shadow-green-400/40 hover:bg-green-600 hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Registrarse
                    </button>
                </div>

                <!-- 🔹 Botón para regresar al login -->
                <div class="text-center mt-6">
                    <button @click="router.push('/')" class="text-green-300 hover:text-green-400 underline font-['Press_Start_2P'] text-sm md:text-base">Volver al login</button>
                </div>

                <div v-if="errorMessage" class="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
                    🚨
                    {{ errorMessage }}
                </div>

                <div v-if="successMessage" class="mt-4 px-4 py-2 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center">
                    🎉
                    {{ successMessage }}
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
                <span class="text-green-500 font-['Press_Start_2P']">Registrando...</span>
            </div>
        </div>
    </div>
</template>
