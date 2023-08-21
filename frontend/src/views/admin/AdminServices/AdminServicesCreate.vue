<template>
    <div class="wrapper">
        <card class="mb-16">
            <form @submit.prevent="save" novalidate>
                <h1 class="text-center mb-8">
                    {{ translations.TServiceCreation }}
                </h1>

                <AdminServicesForm :data="createData" ref="form" />

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
import { type CreateServiceDto } from '@/interfaces/services.interface';
import { useServicesStore } from '@/stores/services.store';
import * as translations from '@/constants/ServicesTranslations';
import AdminServicesForm from './AdminServicesForm.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const servicesStore = useServicesStore();

const loading = computed(() => servicesStore.loading);
const error = computed(() => servicesStore.error);

const genInitialData = () => {
    return {
        staffId: '',
        type: '',
        name: '',
        goal: '',
        imgSrc: '',
        shortDescription: '',
        description: '',
        duration: '',
        price: '',
    };
};

const form = ref(null);

const createData = ref(ref<CreateServiceDto>(genInitialData()));

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    await servicesStore.create(createData.value);

    if (!error.value) {
        router.push('/admin/services');
    }
}
</script>