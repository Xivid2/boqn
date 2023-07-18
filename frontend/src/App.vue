<template>
    <div v-if="isLoaded">
        <header>
          <HeaderAlpha />
            <div class="wrapper my-8">
                <nav>
                    <RouterLink to="/">Начало</RouterLink>
                    <RouterLink to="/about">За Нас</RouterLink>
                    <RouterLink to="/services">Услуги</RouterLink>
                    <RouterLink to="/prices">Ценоразпис</RouterLink>
                    <RouterLink to="/appointment">Запис на час</RouterLink>
                    <RouterLink to="/gallery">Галерия</RouterLink>
                    <RouterLink to="/contact">Контакти</RouterLink>
                </nav>
          </div>
        </header>

        <notifications />

        <RouterView />
    </div>
</template>

<script lang="ts" setup>
import HeaderAlpha from './components/header/HeaderAlpha.vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { computed } from 'vue';
const authStore = useAuthStore();

const isLoaded = computed(() => {
    return authStore.isInitialRefreshComplete;
});
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
}
</style>
