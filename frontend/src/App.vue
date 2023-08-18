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
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import HamburgerButton from '@/components/HamburgerButton.vue';
import MobileMenu from '@/components/MobileMenu.vue';
import HeaderAlpha from '@/components/header/HeaderAlpha.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useMenuStore } from '@/stores/menu.store';
const authStore = useAuthStore();
const menuStore = useMenuStore();

const isLoaded = computed(() => {
    return authStore.isInitialRefreshComplete;
});

const toggleMenu = () => {
    menuStore.toggle();
}
</script>