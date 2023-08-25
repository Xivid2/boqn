<template>
    <p v-if="input.date" class="my-4">
        {{ TAppointmentsChosenAppointment }} {{ formattedDate }}
    </p>

    <b-input
        :text="serviceTranslations.TServiceType"
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
        :text="serviceTranslations.TService"
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

    <b-input
        v-model="v$.firstName.$model"
        :models="v$.firstName"
        :text="authTranslations.TAuthFirstName"
    />

    <b-input
        v-model="v$.lastName.$model"
        :models="v$.lastName"
        :text="authTranslations.TAuthLastName"
    />

    <b-input
        v-model="v$.phone.$model"
        :models="v$.phone"
        :text="authTranslations.TAuthPhone"
    />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators';
import { TAppointmentsChosenAppointment } from '@/constants/AppointmentsTranslations';
import type { CreateAppointmentDto } from '@/interfaces/appointments.interface';
import * as authTranslations from '@/constants/AuthTranslations';
import * as serviceTranslations from '@/constants/ServicesTranslations';
import * as dayjs from 'dayjs';
import { ServiceType } from '@/enums/service-type.enum';
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();

const formattedDate = computed(() => dayjs(input.value.date).format('YYYY-MM-DD HH:mm'));

const props = defineProps<{
    input: CreateAppointmentDto,
    staffId: Number,
}>();

const input = computed(() => props.input);
const staffId = computed(() => props.staffId);

const services = computed(() => {
    const result = {
        ...servicesStore.massages.length && +staffId.value === 1 ? {
            [ServiceType.MASSAGE]: {
                name: serviceTranslations.TServiceTypeMassages,
                model: ServiceType.MASSAGE,
                values: servicesStore.massages,
            }
        } : {},
        ...servicesStore.ergos.length && +staffId.value === 1 ? {
            [ServiceType.ERGO]: {
                name: serviceTranslations.TServiceTypeErgo,
                model: ServiceType.ERGO,
                values: servicesStore.ergos,
            }
        } : {},
        ...servicesStore.logos.length && +staffId.value === 2 ? {
            [ServiceType.LOGO]: {
                name: serviceTranslations.TServiceTypeLogo,
                model: ServiceType.LOGO,
                values: servicesStore.logos,
            }
        } : {},
    };

    return result;
});

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
        phone: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(10),
        },
    };
});

const v$ = useValidate(rules, input);

const validate = () => {
    v$.value.$touch();

    return !v$.value.$error;
}

defineExpose({ validate });
</script>