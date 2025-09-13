<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import logoImage from '@/assets/logo22.png';
import UserProfile from '@/layout/UserProfile.vue';
import desplazarSound from '@/assets/desplazarSound.mp3'; // importa sonido

const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const userMenuActive = ref(false);
const router = useRouter();
import '@fontsource/press-start-2p';

let soundEffect = null;

onMounted(() => {
    bindOutsideClickListener();
    // Prepara el audio
    soundEffect = new Audio(desplazarSound);
    soundEffect.volume = 0.8; //  volumen
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
    soundEffect = null;
});

const logoUrl = computed(() => logoImage);

// unción para reproducir sonido
const playSound = () => {
    if (soundEffect) {
        soundEffect.currentTime = 0; // Reinicia desde el inicio
        soundEffect.play().catch((err) => {
            console.warn('El navegador bloqueó autoplay:', err);
        });
    }
};

const toggleUserMenu = () => {
    playSound(); // reproduce sonido al abrir/cerrar menú usuario
    userMenuActive.value = !userMenuActive.value;
};

const handleMenuToggle = () => {
    playSound(); // 👈 reproduce sonido al abrir/cerrar menú lateral
    onMenuToggle();
};

const logout = () => {
    playSound(); // 👈 sonido al cerrar sesión también si quieres
    localStorage.removeItem('access_token');
    router.push('/');
};

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                userMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!userMenuActive.value) return;

    const userMenuEl = document.querySelector('.user-menu');
    const userButtonEl = document.querySelector('.user-menu-button');

    return !((userMenuEl && (userMenuEl.isSameNode(event.target) || userMenuEl.contains(event.target))) || (userButtonEl && (userButtonEl.isSameNode(event.target) || userButtonEl.contains(event.target))));
};
</script>

<template>
    <div class="layout-topbar">
        <!-- Sección izquierda -->
        <div class="left-section">
            <router-link to="/" class="layout-topbar-logo">
                <img :src="logoUrl" alt="logo" />
                <span class="texto-blanco font-['Press_Start_2P']">Command SQL</span>
            </router-link>
            <button class="p-link layout-menu-button layout-topbar-button" @click="handleMenuToggle" style="color: white">
                <i class="pi pi-bars"></i>
            </button>
        </div>

        <!-- Sección derecha -->
        <div class="right-section">
            <button class="p-link layout-topbar-button user-menu-button" @click="toggleUserMenu" style="color: white">
                <i class="pi pi-user"></i>
            </button>
            <div class="user-menu" v-if="userMenuActive">
                <UserProfile />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-topbar {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
}

.texto-blanco {
    color: white;
}

.left-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.right-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
}

.user-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #0a0a0a !important;
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
    padding: 1rem;
    z-index: 100;
    min-width: 220px;
    border: 1px solid #1a1a1a;
}
</style>
