<template>
    <div v-if="isLoaded">
        <header>
            <HeaderAlpha />

            <HamburgerButton @click="toggleMenu" />

            <MobileMenu />
        </header>

        <notifications />

        <RouterView />
    </div>
</template>

<script lang="ts" setup>
import HamburgerButton from './components/HamburgerButton.vue';
import MobileMenu from './components/MobileMenu.vue';
import HeaderAlpha from './components/header/HeaderAlpha.vue';
import { RouterView } from 'vue-router';
import { useHttp } from './plugins/api';
import { $error } from './services/notify.service';
import { useAuthStore } from '@/stores/auth.store';
import { useMenuStore } from '@/stores/menu.store';
import { useServicesStore } from '@/stores/services.store';
import { computed } from 'vue';
const authStore = useAuthStore();
const menuStore = useMenuStore();
const servicesStore = useServicesStore({ useHttp, $error });

const isLoaded = computed(() => {
    return authStore.isInitialRefreshComplete;
});

const getServices = async () => {
    await servicesStore.getAll();
};

getServices();

const toggleMenu = () => {
    menuStore.toggle();
}
</script>