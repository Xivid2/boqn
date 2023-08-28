<template>
    <div class="tight-wrapper">
        <form @submit.prevent="save" class="my-4">
            <AppointmentsForm
                ref="form"
                :input="input"
                :start-date="startDate"
                :end-date="endDate"
                @on-date-choose="setDate"
                @is-using-user-data="onIsUsingUserDataChange"
            />
    
            <v-button
                type="submit"
                block
                class="mt-8"
            >
                {{ appointmentsTranslations.TAppointmentsCreate }}
            </v-button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import * as dayjs from 'dayjs';
import AppointmentsForm from './AppointmentsForm.vue';
import * as appointmentsTranslations from '@/constants/AppointmentsTranslations';
import { useAppointmentsStore } from '@/stores/appointments.store';
const appointmentsStore = useAppointmentsStore();
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();

const startDate = dayjs().startOf('day').add(1, 'day');
const endDate = dayjs().startOf('day').add(1, 'month');

const form = ref();

const genInput = () => {
    return {
        date: "",
        serviceType: "",
        serviceId: "",
        firstName: authStore.user.firstName,
        lastName: authStore.user.lastName,
        email: authStore.user.email,
        phone: authStore.user.phone,
    };
};

const input = ref({ ...genInput() });

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    await appointmentsStore.create(input.value);

    // TODO: Navigate to appointments page
};

const setDate = (val: any) => {
    input.value.date = val;
};

const onIsUsingUserDataChange = (val: boolean) => {
    if (val === true) {
        input.value.firstName = authStore.user.firstName;
        input.value.lastName = authStore.user.lastName;
        input.value.email = authStore.user.email;
        input.value.phone = authStore.user.phone;
    }
};
</script>