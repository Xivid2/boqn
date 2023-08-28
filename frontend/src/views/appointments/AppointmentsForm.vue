<template>
    <b-input
        :text="servicesTranslations.TServiceType"
        type="select"
        v-model="v$.serviceType.$model"
        :models="v$.serviceType"
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
        v-if="input.serviceType"
        :text="servicesTranslations.TService"
        type="select"
        v-model="v$.serviceId.$model"
        :models="v$.serviceId"
    >
        <option
            v-for="(service, index) in services[input.serviceType].values"
            :key="index"
            :value="service.id"
        >
            {{ service.name }}
        </option>
    </b-input>

    <div v-if="input.serviceId && unavailableDates">
        <DatePicker
            ref="datePickerRef"
            v-model="dateFromDatepicker"
            @update:model-value="setDate"
            :unavailableDates="unavailableDates"
            :startDate="props.startDate"
            :endDate="props.endDate"
            class="block"
            :label="appointmentsTranslations.TAppointmentsAppointmentCreate"
        />
        <p v-if="errorMessage" class="input-error">
            {{ errorMessage }}
        </p>
    </div>

    <p v-if="input.date" class="my-4">
        {{ appointmentsTranslations.TAppointmentsChosenAppointment }} {{ formattedDate }}
    </p>

    <div class="mt-8">
        <checkbox
            v-model="useUserData"
            :text="appointmentsTranslations.TAppointmentsUseUserData"
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
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import * as dayjs from 'dayjs';
import * as servicesTranslations from '@/constants/ServicesTranslations';
import * as authTranslations from '@/constants/AuthTranslations';
import * as appointmentsTranslations from '@/constants/AppointmentsTranslations';
import DatePicker from '@/components/DatePicker.vue';
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators';
import type { CreateAppointmentDto } from '@/interfaces/appointments.interface';
import { useAppointmentsStore } from '@/stores/appointments.store';
const appointmentsStore = useAppointmentsStore();
import type { AppointmentsByPeriod } from '@/interfaces/appointments.interface';
import { ServiceType } from '@/enums/service-type.enum';
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();

const useUserData = ref(true);
const errorMessage = ref("");
const formattedDate = ref("");
const dateFromDatepicker = ref();
const unavailableDates = ref()
const datePickerRef = ref(null);

const emit = defineEmits(["isUsingUserData", "onDateChoose"]);

const props = defineProps<{
    input: CreateAppointmentDto,
    startDate: Date,
    endDate: Date,
}>();

const input = computed(() => props.input);

const rules = computed(() => {
    return {
        date: { required },
        serviceType: { required },
        serviceId: { required },
        firstName: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
        },
        lastName: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
        },
        email: {
            required,
            maxLength: maxLength(255),
        },
        phone: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(20),
        },
    };
});

const services = {
    ...servicesStore.massages.length ? {
        [ServiceType.MASSAGE]: {
            name: servicesTranslations.TServiceTypeMassages,
            model: ServiceType.MASSAGE,
            values: servicesStore.massages,
        }
    } : {},
    ...servicesStore.ergos.length ? {
        [ServiceType.ERGO]: {
            name: servicesTranslations.TServiceTypeErgo,
            model: ServiceType.ERGO,
            values: servicesStore.ergos,
        }
    } : {},
    ...servicesStore.logos.length ? {
        [ServiceType.LOGO]: {
            name: servicesTranslations.TServiceTypeLogo,
            model: ServiceType.LOGO,
            values: servicesStore.logos,
        }
    } : {},
};

const v$ = useValidate(rules, input);

const validate = () => {
    v$.value.$reset();

    v$.value.$touch();

    if (!input.value.date) {
        errorMessage.value = appointmentsTranslations.TAppointmentsYouNeedToChooseValue;
    }

    return !v$.value.$error || !errorMessage.value.length;
}

defineExpose({ validate });

const setUnavailableDates = async (query: AppointmentsByPeriod) => {
    await appointmentsStore.getForPeriod(query);
    unavailableDates.value = appointmentsStore.appointments;
}

const setDate = (value: any) => {
    const newDate = dayjs(value);
    const hour = newDate.hour();

    let emitValue = new Date(value);

    if (hour <= 0) {
        emitValue = null;
    };

    emit("onDateChoose", emitValue);
}

watch(useUserData, (val: boolean) => {
    emit("isUsingUserData", val);
});

watch(datePickerRef, (val) => {
    if (!val) return;

    datePickerRef.value.recalculate();
})

watch(
    () => input.value.serviceType,
    (type) => {
        if (!type) return;

        input.value.serviceId = '';
        input.value.date = '';

        setUnavailableDates({
            type,
            startDate: props.startDate,
            endDate: props.endDate,
        });
    }
);

watch(
    () => input.value.date,
    (val) => {
        if (!val) {
            return formattedDate.value = '';
        }

        formattedDate.value = dayjs(val).format('YYYY-MM-DD HH:mm');
        dateFromDatepicker.value = null;
        errorMessage.value = "";
});
</script>