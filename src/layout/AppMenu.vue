<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Principal',
        class: 'principal',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Apartados',
        class: 'apartados',
        items: [
            {
                label: 'Misiones',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Mision 1',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/1'
                    },
                    {
                        label: 'Mision 2',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/2'
                    },
                    {
                        label: 'Mision 3',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/3'
                    },
                    {
                        label: 'Mision 4',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/4'
                    },
                    {
                        label: 'Mision 5',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/5'
                    },
                    {
                        label: 'Mision 6',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/6'
                    },
                    {
                        label: 'Mision 7',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/7'
                    },
                    {
                        label: 'Mision 8',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/8'
                    },
                    {
                        label: 'Mision 9',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/9'
                    },
                    {
                        label: 'Mision 10',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/10'
                    },
                    {
                        label: 'Mision 11',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/11'
                    },
                    {
                        label: 'Mision 12',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/12'
                    },
                    {
                        label: 'Mision 13',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/13'
                    },
                    {
                        label: 'Mision 14',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/14'
                    },
                    {
                        label: 'Mision 15',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/15'
                    },
                    {
                        label: 'Mision 16',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/mision/16'
                    }
                ]
            },
            {
                label: 'Manual de Uso',
                icon: 'pi pi-fw pi-users',
                to: '/manual/ayuda'
            },
            {
                label: 'Logros',
                icon: 'pi pi-fw pi-users',
                to: '/logros/todos'
            },
            {
                label: 'Estadísticas',
                icon: 'pi pi-fw pi-history',
                to: '/uikit/accionesultima'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="'separator-' + i"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>
// Clase para íconos naranjas cuando está seleccionado
.icon-orange {
    color: orange;
}

/* Contenedor principal del menú */
ul.layout-menu {
    background: transparent !important;
    padding: 0;
    margin: 0;
}

/* Separadores */
.menu-separator {
    background: transparent !important;
    border: none;
}

</style>
