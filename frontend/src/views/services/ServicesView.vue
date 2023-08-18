<template>
    <div class="wrapper">
        <nav class="tabs mt-16">
            <RouterLink
                to="/services/massages"
                class="tab mr-16"
            >
                Масажи
            </RouterLink>

            <RouterLink
                to="/services/ergo"
                class="tab mx-16"
            >
                Ерготерапия
            </RouterLink>

            <RouterLink
                to="/services/logo"
                class="tab ml-16"
            >
                Логопедия
            </RouterLink>
        </nav>
    </div>

    <RouterView />
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
import { useHttp } from '@/plugins/api';
import { $error } from '@/services/notify.service';
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore({ useHttp, $error });

const getServices = async () => {
    await servicesStore.getAll();
};

getServices();
</script>