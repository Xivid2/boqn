<template>
    <form @submit.prevent="save">
        <AdminAppointmentsForm
            ref="form"
            :input="formInput"
            :staffId="staffId"
        />
    </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import AdminAppointmentsForm from './AdminAppointmentsForm.vue';
import { useAppointmentsStore } from '@/stores/appointments.store';
const appointmentsStore = useAppointmentsStore();

const props = defineProps(["date", "staffId"]);
const propDate = computed(() => props.date);
const staffId = props.staffId;

const form = ref();

const genInput = () => {
    return {
        date: "",
        serviceType: "",
        serviceId: "",
        firstName: "",
        lastName: "",
        phone: "",
    };
};

const formInput = ref({ ...genInput() });
formInput.value.date = propDate.value;

const clearForm = () => {
    formInput.value = { ...genInput() };
};

const save = async () => {
    const isValid = form.value.validate();

    if (!isValid) return;

    await appointmentsStore.create(formInput.value);
};

defineExpose({ save, clearForm });
</script>