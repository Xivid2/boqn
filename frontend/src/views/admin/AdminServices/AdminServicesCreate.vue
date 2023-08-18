<template>
    <div class="wrapper">
        <card class="mb-16">
            <form @submit.prevent="save" novalidate>
                <h1 class="text-center mb-8">
                    Създаване на услуга
                </h1>

                <AdminServicesForm :data="createData" ref="form" />

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
import { type CreateServiceDto, ServicesService } from '@/services/services.service';
import { useHttp } from '@/plugins/api';
import { $error, $success } from '@/services/notify.service';
import { useServicesStore } from '@/stores/services.store';
const serviceStore = useServicesStore({ useHttp, $error });
const service = new ServicesService(useHttp);
import AdminServicesForm from './AdminServicesForm.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

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

const isFormDisabled = ref(false);
const form = ref(null);

const createData = ref(ref<CreateServiceDto>(genInitialData()));

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    isFormDisabled.value = true;

    const { error } = await service.create({ ...createData.value });

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success('Успешно създаване');

    router.push('/admin/services')
}
</script>