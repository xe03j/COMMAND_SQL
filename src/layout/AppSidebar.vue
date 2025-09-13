<script setup>
import AppMenu from './AppMenu.vue';
</script>

<template>
    <div class="layout-sidebar">
        <app-menu></app-menu>
    </div>
</template>

<style lang="scss" scoped>
/* Fondo del sidebar completo */
.layout-sidebar {
    background: transparent !important; /* o rgba(0,0,0,0) para transparencia total */
}

/* Por si hay scroll o padding que muestre blanco */
.layout-sidebar .layout-menu {
    background: transparent !important;
}

/* Scroll personalizado para sidebar */
.layout-sidebar::-webkit-scrollbar {
    width: 8px; /* ancho del scrollbar */
}

.layout-sidebar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05); /* fondo del track */
    border-radius: 4px;
}

.layout-sidebar::-webkit-scrollbar-thumb {
    background-color: #15ff73; /* color del thumb */
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0); /* espacio alrededor del thumb */
}

.layout-sidebar::-webkit-scrollbar-thumb:hover {
    background-color: #00ff44; /* color al pasar el mouse */
}
</style>
