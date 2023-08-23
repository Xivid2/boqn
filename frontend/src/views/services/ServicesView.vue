<template>
    <div class="wrapper">
        <nav class="tabs mt-16">
            <RouterLink
                to="/services/massages"
                class="tab mr-16"
            >
                {{ translations.TServiceTypeMassages }}
            </RouterLink>

            <RouterLink
                to="/services/ergo"
                class="tab mx-16"
            >
                {{ translations.TServiceTypeErgo }}
            </RouterLink>

            <RouterLink
                to="/services/logo"
                class="tab ml-16"
            >
                {{ translations.TServiceTypeLogo }}
            </RouterLink>
        </nav>
    </div>

    <RouterView />
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
import * as translations from '@/constants/ServicesTranslations';
</script>