<template>
    <div class="tight-wrapper">
        <v-form
            @submit.prevent="createAppointment"
            ref="form"
            class="mt-8"
        >
            <b-input
                text="Тип"
                type="select"
                @change="handleChangeServiceType"
                v-model="v$.chosenServiceType.$model"
                :models="v$.chosenServiceType"
            >
                <option
                    v-for="(serviceType, index) in services"
                    :key="index"
                    :value="serviceType.model"
                >
                    {{ serviceType.name }}
                </option>
            </b-input>

            <b-input
                v-if="input.chosenServiceType"
                text="Услуга"
                type="select"
                @change="handleChangeService"
                v-model="v$.chosenServiceId.$model"
                :models="v$.chosenServiceId"
            >
                <option
                    v-for="(service, index) in services[input.chosenServiceType].values"
                    :key="index"
                    :value="service.id"
                >
                    {{ service.name }}
                </option>
            </b-input>

            <div v-if="input.chosenServiceId">
                <DatePicker
                    v-if="unavailableDates"
                    v-model="date"
                    @update:model-value="setDate"
                    :unavailableDates="unavailableDates"
                    :startDate="startDate"
                    :endDate="endDate"
                    :isParentLoaded="isParentLoaded"
                    class="block"
                    label="Избор на час:"
                />
                <p v-if="errorMessage" class="input-error">
                    {{ errorMessage }}
                </p>
            </div>

            <p v-if="chosenDate" class="mt-8">
                Избран час: {{ formattedDate }}
            </p>

            <v-button
                type="submit"
                block
                class="mt-16"
            >
                Запиши
            </v-button>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, reactive, computed, watch } from "vue";
import { useHttp } from '@/plugins/api';
import { $error, $success } from "@/services/notify.service";
import AppointmentService from '@/services/appointment.service';
const appointment = new AppointmentService(useHttp);
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();
import DatePicker from '../DatePicker.vue';
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';
import { ServiceType } from '@/enums/service-type.enum';

const services = {
    ...servicesStore.massages.length ? {
        [ServiceType.MASSAGE]: {
            name: "Масажи",
            model: ServiceType.MASSAGE,
            values: servicesStore.massages,
        }
    } : {},
    ...servicesStore.ergos.length ? {
        [ServiceType.ERGO]: {
            name: "Ерготерапия",
            model: ServiceType.ERGO,
            values: servicesStore.ergos,
        }
    } : {},
    ...servicesStore.logos.length ? {
        [ServiceType.LOGO]: {
            name: "Логопедия",
            model: ServiceType.LOGO,
            values: servicesStore.logos,
        }
    } : {},
};

const isParentLoaded = ref(false);
const startDate = ref();
const endDate = ref();
const date = ref(null);
const chosenDate = ref();
const formattedDate = ref("");
const unavailableDates = ref([]);
const errorMessage = ref("");

const input = reactive({
    chosenServiceType: null,
    chosenServiceId: null,
});

const rules = computed(() => {
    return {
        chosenServiceType: {
            required,
        },
        chosenServiceId: {
            required,
        },
    };
});

const v$ = useValidate(rules, input);

const handleChangeServiceType = (evt: any) => {
    const value = evt.target.value;
    input.chosenServiceType = value;
    input.chosenServiceId = null;
};

const handleChangeService = (evt: any) => {
    const value = evt.target.value;
    input.chosenServiceId = value;
};

const validate = () => {
    v$.value.$touch();

    return !v$.value.$error;
}

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
        return $error(error.response?.data?.message || "Something went wrong");
    }

    startDate.value = tomorrow;
    endDate.value = afterMonth;
    unavailableDates.value = data;

    isParentLoaded.value = true;
}

const createAppointment = async () => {
    v$.value.$reset();

    const isValid = validate();

    if (!isValid) return;


    if (!chosenDate.value) {
        return errorMessage.value = "Трябва да изберете час";
    }

    const { error } = await appointment.create({
        date: chosenDate.value,
        serviceId: +input.chosenServiceId
    });

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success("Успешно записахте час");

    await setUnavailableDates();

    input.chosenServiceType = null;
    input.chosenServiceId = null;
    chosenDate.value = "";
    errorMessage.value = "";
}

watch(chosenDate, (val) => {
    formattedDate.value = dayjs(val).format('YYYY-MM-DD HH:mm');
    errorMessage.value = "";
});

setUnavailableDates();
</script>