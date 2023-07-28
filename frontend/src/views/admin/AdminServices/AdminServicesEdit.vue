<template>
    <div class="wrapper">
        <card class="mb-16">
            <form @submit.prevent="save">
                <h1 class="text-center mb-8">
                    Обновяване на услуга
                </h1>

                <AdminServicesForm :data="state" ref="form" />

                <v-button
                    :disabled="isFormDisabled"
                    type="submit"
                    block
                    class="mt-2"
                >
                    Запази
                </v-button>
            </form>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type UpdateServiceDto, ServicesService } from '@/services/services.service';
import { useHttp } from '@/plugins/api';
import { $error, $success } from '@/services/notify.service';
const service = new ServicesService(useHttp);
import AdminServicesForm from './AdminServicesForm.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const serviceId = route.params.id;

const state = ref(null);

const getService = async () => {
    const { data, error } = await service.get(serviceId);

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    state.value = data;
}

getService();

const isFormDisabled = ref(false);
const form = ref(null);

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    isFormDisabled.value = true;

    const { data, error } = await service.update(serviceId, { ...state.value });

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success('Успешно създаване');

    router.push('/admin/services')
}
</script>