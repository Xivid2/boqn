<template>
    <nav class="navigation">
        <RouterLink to="/">Начало</RouterLink>
        <RouterLink to="/about">За Нас</RouterLink>
        <RouterLink to="/services">Услуги</RouterLink>
        <RouterLink to="/prices">Ценоразпис</RouterLink>
        <RouterLink to="/appointment">Запис на час</RouterLink>
        <RouterLink to="/gallery">Галерия</RouterLink>
        <RouterLink to="/contact">Контакти</RouterLink>
    </nav>
</template>>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.navigation {
    display: flex;
    justify-content: space-between;

    .router-link-exact-active,
    .router-link-active {
        box-shadow: 0px 3px 0px $primary-color;
    }
}
</style>