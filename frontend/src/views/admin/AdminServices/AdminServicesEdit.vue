<template>
    <div class="wrapper">
        <card class="mb-16">
            <div v-if="loading">
                loading...
            </div>

            <form @submit.prevent="save" v-else>
                <h1 class="text-center mb-8">
                    {{ translations.TServiceUpdate }}
                </h1>

                <AdminServicesForm :data="service" ref="form" />

                <v-button
                    :disabled="loading"
                    type="submit"
                    block
                    class="mt-2"
                >
                    {{ translations.TServiceFormSave }}
                </v-button>
            </form>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useServicesStore } from '@/stores/services.store';
import AdminServicesForm from './AdminServicesForm.vue';
import * as translations from '@/constants/ServicesTranslations';
const router = useRouter();
const route = useRoute();
const servicesStore = useServicesStore();

const loading = computed(() => servicesStore.loading);
const service = computed(() => servicesStore.service);
const anyError = computed(() => servicesStore.error);

const paramId = +route.params.id;

const getService = async () => {
    await servicesStore.get(paramId);
}

getService();

const form = ref(null);

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    await servicesStore.update(paramId, service.value)

    if (!anyError.value) {
        router.push('/admin/services');
    }
}
</script>