<template>
    <div class="d-flex align-center justify-center">
        <v-sheet width="400" class="mx-auto mt-16">
            <h1 class="block text-center">
                Запис на час
            </h1>

            <v-form
                @submit.prevent="createAppointment"
                ref="form"
                class="mt-8"
            >
                <label>Избор на час:</label>
                <DatePicker
                    v-if="unavailableDates"
                    v-model="date"
                    @update:model-value="setDate"
                    :unavailableDates="unavailableDates"
                    :startDate="startDate"
                    :endDate="endDate"
                    :isParentLoaded="isParentLoaded"
                    class="block"
                />
                <p v-if="errorMessage" style="font-size: 13px; color: red; margin-top: 2px">
                    {{ errorMessage }}
                </p>

                <p v-if="chosenDate" class="mt-8">
                    Избран час: {{ formattedDate }}
                </p>

                <v-button
                    type="submit"
                    block
                    class="mt-8"
                >
                    Запиши
                </v-button>
            </v-form>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, watch } from "vue";
import { useHttp } from '@/plugins/api';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
import ErgoAppointmentService from '../../services/ergo-appointment.service';
const appointment = new ErgoAppointmentService(useHttp);
import DatePicker from '../DatePicker.vue';
import { useAuthStore } from '../../stores/auth.store';

const isParentLoaded = ref(false);
const startDate = ref();
const endDate = ref();
const date = ref(null);
const chosenDate = ref();
const formattedDate = ref("");
const unavailableDates = ref([]);
const errorMessage = ref("");

const setDate = (value: any) => {
    const newDate = dayjs(value);
    const hour = newDate.hour();

    if (hour > 0) date.value = null;

    chosenDate.value = new Date(value);
}

const setUnavailableDates = async () => {
    const tomorrow = dayjs().startOf('day').add(1, 'day');
    const afterMonth = dayjs().startOf('day').add(1, 'month');

    const { data, error } = await appointment.getForPeriod(tomorrow, afterMonth);

    if (error) {
        return notify({
            type: "error",
            text: error.response?.data?.message || "Something went wrong"
        });
    }

    startDate.value = tomorrow;
    endDate.value = afterMonth;
    unavailableDates.value = data;

    isParentLoaded.value = true;
}

const createAppointment = async () => {
    if (!chosenDate.value) {
        return errorMessage.value = "Трябва да изберете час";
    }

    const auth = useAuthStore()
    console.log('auth:', auth.isAuthenticated)

    const { data, error } = await appointment.create(new Date(chosenDate.value));

    if (error) {
        return notify({
            type: "error",
            text: error.response?.data?.message || "Something went wrong"
        });
    }

    notify({
        type: "success",
        text: "Успешно записахте час"
    });

    await setUnavailableDates();

    chosenDate.value = "";
    errorMessage.value = "";
}

watch(chosenDate, (val) => {
    formattedDate.value = dayjs(val).format('YYYY-MM-DD HH:mm');
    errorMessage.value = "";
})

setUnavailableDates();
</script>