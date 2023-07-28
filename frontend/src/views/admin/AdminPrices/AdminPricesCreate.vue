<template>
    <div class="wrapper">
        <card class="mb-16">
            <form @submit.prevent="save">
                <h1 class="text-center mb-8">
                    Създаване на услуга
                </h1>

                <AdminPricesForm :data="createData" ref="form" />

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
import { CreateServiceDto, ServicesService } from '@/services/services.service';
import { useHttp } from '@/plugins/api';
import { $error, $success } from '@/services/notify.service';
const service = new ServicesService(useHttp);
import AdminPricesForm from './AdminPricesForm.vue';

const genInitialData = () => {
    return {
        type: 'ERGO',
        name: '',
        goal: '',
        imgSrc: '',
        shortDescription: '',
        description: '',
        duration: 0,
        price: 0,
    };
};

const isFormDisabled = ref(false);
const form = ref(null);

const createData = ref(ref<CreateServiceDto>(genInitialData()));

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    isFormDisabled.value = true;

    const { data, error } = await service.create({ ...createData.value });
    console.log('data:', data)

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success('dadar');
}
</script>