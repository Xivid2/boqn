<template>
    <div class="wrapper mt-16 mb-8">
        <card>
            <FullCalendar
                @date-clicked="handleDateClick"
                @chosen-staff-id="handleChosenStaffId"
                @onCancel="handleCancel"
            />
        </card>

        <Modal
            v-model="isCreateEventModalOpen"
            @update:modelValue="isCreateEventModalOpen = $event"
            @onConfirm="onSave"
            @on-cancel="handleCancel"
            :title="TAppointmentsAppointmentCreate"
        >
            <div class="tight-wrapper">
                <p v-if="chosenDate" class="my-4">
                    {{ TAppointmentsChosenAppointment }} {{ chosenDate }}
                </p>

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

                <b-input
                    v-model="v$.firstName.$model"
                    :models="v$.firstName"
                    :text="authTranslations.TAuthFirstName"
                >
                </b-input>

                <b-input
                    v-model="v$.lastName.$model"
                    :models="v$.lastName"
                    :text="authTranslations.TAuthLastName"
                >
                </b-input>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import Modal from '@/components/Modal.vue';
import FullCalendar from '@/components/FullCalendar.vue';
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators';
import { useStaffStore } from '@/stores/staff.store';
import { useServicesStore } from '@/stores/services.store';
import { ref, reactive, computed } from 'vue';
import { ServiceType } from '@/enums/service-type.enum';
import * as serviceTranslations from '@/constants/ServicesTranslations';
import * as authTranslations from '@/constants/AuthTranslations';
import { TAppointmentsAppointmentCreate, TAppointmentsChosenAppointment } from '@/constants/AppointmentsTranslations';
import * as dayjs from 'dayjs';

const staffStore = useStaffStore();
const servicesStore = useServicesStore();
const chosenStaffId = ref(1);
const isCreateEventModalOpen = ref(false);

const input = reactive({
    chosenDate: null,
    chosenServiceType: null,
    chosenServiceId: null,
    firstName: null,
    lastName: null,
});

const services = {
    ...servicesStore.massages.length && chosenStaffId.value === 1 ? {
        [ServiceType.MASSAGE]: {
            name: serviceTranslations.TServiceTypeMassages,
            model: ServiceType.MASSAGE,
            values: servicesStore.massages,
        }
    } : {},
    ...servicesStore.ergos.length && chosenStaffId.value === 1 ? {
        [ServiceType.ERGO]: {
            name: serviceTranslations.TServiceTypeErgo,
            model: ServiceType.ERGO,
            values: servicesStore.ergos,
        }
    } : {},
    ...servicesStore.logos.length && chosenStaffId.value === 2 ? {
        [ServiceType.LOGO]: {
            name: serviceTranslations.TServiceTypeLogo,
            model: ServiceType.LOGO,
            values: servicesStore.logos,
        }
    } : {},
};

staffStore.getAll();

const rules = computed(() => {
    return {
        chosenDate: { required },
        chosenServiceType: { required },
        chosenServiceId: { required },
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

const clearFields = () => {
    input.chosenDate = null;
    input.chosenServiceType = null;
    input.chosenServiceId = null;
    input.firstName = null;
    input.lastName = null;
};

const handleCancel = () => {
    clearFields();
};

const handleDateClick = (event: any) => {
    input.chosenDate = dayjs(event.date).format('YYYY-MM-DD HH:mm');;
    isCreateEventModalOpen.value = true;
}

const handleChosenStaffId = (event: number) => {
    chosenStaffId.value = event;
}

const onSave = () => {
    console.log('saved')

    clearFields();

    isCreateEventModalOpen.value = false;
}
</script>