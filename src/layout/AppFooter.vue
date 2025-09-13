<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import logoImage from '@/assets/logo2.png'; // Importa la imagen

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return logoImage; // Usa la imagen importada directamente
});
</script>

<template>
    <div class="layout-footer">
        <span class="font-medium ml-2">Command SQL</span>
    </div>
</template>

<style lang="scss" scoped>
.logo-image {
    width: 60px; /* Ajusta el ancho */
    height: auto; /* Mantiene la proporción automáticamente */
}
</style>
