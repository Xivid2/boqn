<template>
    <div class="tight-wrapper">
        <v-form
            @submit.prevent="createAppointment"
            ref="form"
            class="mt-8"
        >
            <b-input
                :text="serviceTranslations.TServiceType"
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
                :text="serviceTranslations.TService"
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
                    :startDate="tomorrow"
                    :endDate="afterMonth"
                    :isParentLoaded="isParentLoaded"
                    class="block"
                    :label="appointmentTranslations.TAppointmentsAppointmentCreate"
                />
                <p v-if="errorMessage" class="input-error">
                    {{ errorMessage }}
                </p>
            </div>

            <p v-if="chosenDate" class="my-4">
                {{ appointmentTranslations.TAppointmentsChosenAppointment }} {{ formattedDate }}
            </p>

            <div class="mt-6">
                <checkbox
                    v-model="useUserData"
                    text="Използвай данните от потребителя"
                />
            </div>

            <b-input
                v-model="v$.firstName.$model"
                :models="v$.firstName"
                :text="authTranslations.TAuthFirstName"
                :disabled="useUserData"
                class="mt-3"
            />

            <b-input
                v-model="v$.lastName.$model"
                :models="v$.lastName"
                :text="authTranslations.TAuthLastName"
                :disabled="useUserData"
            />

            <b-input
                v-model="v$.email.$model"
                :models="v$.email"
                :text="authTranslations.TAuthEmail"
                :disabled="useUserData"
            />

            <b-input
                v-model="v$.phone.$model"
                :models="v$.phone"
                :text="authTranslations.TAuthPhone"
                :disabled="useUserData"
            />

            <v-button
                type="submit"
                block
                class="mt-8"
            >
                {{ appointmentTranslations.TAppointmentsCreate }}
            </v-button>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, reactive, computed, watch } from "vue";
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();
import DatePicker from '../DatePicker.vue';
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';
import { ServiceType } from '@/enums/service-type.enum';
import { useAppointmentsStore } from '@/stores/appointments.store';
import { useAuthStore } from "@/stores/auth.store";
const appointmentsStore = useAppointmentsStore();
const authStore = useAuthStore();
import * as serviceTranslations from '@/constants/ServicesTranslations';
import * as appointmentTranslations from '@/constants/AppointmentsTranslations';
import * as authTranslations from '@/constants/AuthTranslations';
import { type AppointmentsByPeriod } from '@/interfaces/appointments.interface';

const services = {
    ...servicesStore.massages.length ? {
        [ServiceType.MASSAGE]: {
            name: serviceTranslations.TServiceTypeMassages,
            model: ServiceType.MASSAGE,
            values: servicesStore.massages,
        }
    } : {},
    ...servicesStore.ergos.length ? {
        [ServiceType.ERGO]: {
            name: serviceTranslations.TServiceTypeErgo,
            model: ServiceType.ERGO,
            values: servicesStore.ergos,
        }
    } : {},
    ...servicesStore.logos.length ? {
        [ServiceType.LOGO]: {
            name: serviceTranslations.TServiceTypeLogo,
            model: ServiceType.LOGO,
            values: servicesStore.logos,
        }
    } : {},
};

const isParentLoaded = ref(false);
const date = ref(null);
const chosenDate = ref();
const formattedDate = ref("");
const errorMessage = ref("");
const useUserData = ref(true);

const tomorrow = dayjs().startOf('day').add(1, 'day');
const afterMonth = dayjs().startOf('day').add(1, 'month');

const unavailableDates = computed(() => appointmentsStore.appointments);

const input = reactive({
    firstName: authStore.user.firstName,
    lastName: authStore.user.lastName,
    email: authStore.user.email,
    phone: authStore.user.phone,
    chosenServiceType: null,
    chosenServiceId: null,
});

const rules = computed(() => {
    return {
        firstName: { required },
        lastName: { required },
        email: { required },
        phone: { required },
        chosenServiceType: { required },
        chosenServiceId: { required },
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

const setUnavailableDates = async (query: AppointmentsByPeriod) => {
    await appointmentsStore.getForPeriod(query);

    isParentLoaded.value = true;
}

const createAppointment = async () => {
    v$.value.$reset();

    const isValid = validate();

    if (!isValid) return;

    if (!chosenDate.value) {
        return errorMessage.value = appointmentTranslations.TAppointmentsYouNeedToChooseValue;
    }

    await appointmentsStore.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        date: chosenDate.value,
        serviceId: +input.chosenServiceId
    });

    input.chosenServiceType = null;
    input.chosenServiceId = null;
    chosenDate.value = "";
    errorMessage.value = "";
}

watch(
    () => input.chosenServiceType,
    (type) => {
        if (!type) return;

        setUnavailableDates({
            type,
            startDate: tomorrow,
            endDate: afterMonth,
        });
    }
);

watch(chosenDate, (val) => {
    formattedDate.value = dayjs(val).format('YYYY-MM-DD HH:mm');
    errorMessage.value = "";
});

watch(useUserData, (val: boolean) => {
    if (val === true) {
        input.firstName = authStore.user.firstName;
        input.lastName = authStore.user.lastName;
        input.email = authStore.user.email;
        input.phone = authStore.user.phone;
    }
});
</script>