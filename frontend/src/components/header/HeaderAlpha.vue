<template>
    <div class="w-full header-alpha">
        <div class="header-alpha__text">
            Рехабилитация, лечебни масажи, логопедия
        </div>

        <div class="header-alpha__body">
            <HeaderAlphaTools
                class="mt-4"
            />

            <div class="wrapper">
                <HeaderAlphaNavigation class="my-16" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderAlphaNavigation from './HeaderAlphaNavigation.vue';
import HeaderAlphaTools from './HeaderAlphaTools.vue';
</script>

<style>
@media only screen and (max-width: 1024px) {
    .header-alpha__body {
        display: none;
    }
}
</style>