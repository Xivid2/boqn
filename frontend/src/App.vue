<template>
  <header>
    <HeaderAlpha />
    <div class="wrapper my-8">
      <nav>
        <RouterLink to="/">Начало</RouterLink>
        <RouterLink to="/about">За Нас</RouterLink>
        <RouterLink to="/services">Услуги</RouterLink>
        <RouterLink to="/prices">Ценоразпис</RouterLink>
        <RouterLink to="/book">Запис на час</RouterLink>
        <RouterLink to="/gallery">Галерия</RouterLink>
        <RouterLink to="/contact">Контакти</RouterLink>
      </nav>
    </div>
  </header>
  <notifications />
  <RouterView />
</template>

<script lang="ts" setup>
import HeaderAlpha from './components/header/HeaderAlpha.vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
}
</style>
