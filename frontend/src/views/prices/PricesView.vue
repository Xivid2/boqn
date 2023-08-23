<template>
    <div class="wrapper">
        <nav class="tabs mt-16">
            <RouterLink
                to="/prices/massages"
                class="tab mr-16"
            >
                {{ translations.TServiceTypeMassages }}
            </RouterLink>

            <RouterLink
                to="/prices/ergo"
                class="tab mx-16"
            >
                {{ translations.TServiceTypeErgo }}
            </RouterLink>

            <RouterLink
                to="/prices/logo"
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