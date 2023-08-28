<template>
    <div class="wrapper mt-16 mb-8">
        <card>
            <b-input
                :text="TStaffMember"
                type="select"
                v-model="chosenStaffId"
            >
                <option
                    v-for="(staffMember, index) in staff"
                    :key="index"
                    :value="staffMember.id"
                >
                    {{ staffMember.user.firstName + " " + staffMember.user.lastName }}
                </option>
            </b-input>

            <FullCalendar
                ref="calendar"
                @create-event="handleCreateAppointment"
                @cancel-event="handleDeleteAppointment"
                @query-updated="handleQueryUpdate"
                :events="appointments"
            />
        </card>

        <Modal
            v-model="isCreateEventModalOpen"
            @update:modelValue="isCreateEventModalOpen = $event"
            @on-confirm="handleSaveCreate"
            :title="appointmentTranslations.TAppointmentsAppointmentCreate"
        >
            <div class="tight-wrapper">
                <AdminAppointmentsCreate
                    ref="appointmentCreate"
                    :date="chosenDate"
                    :staffId="chosenStaffId"
                    @created-successfully="handleSaveCreateSucess"
                />
            </div>
        </Modal>

        <Modal
            v-model="isDeleteEventModalOpen"
            @update:modelValue="isDeleteEventModalOpen = $event"
            @on-confirm="handleSaveDelete"
            @on-cancel="handleCancelDelete"
            :title="appointmentTranslations.TAppointmentsAppointmentDelete"
        >
            <div v-if="appointmentToDelete" class="tight-wrapper mb-8 text-center">
                <p class="mb-1">{{ appointmentTranslations.TAppointmentHour }}: {{ dayjs(appointmentToDelete.date).format('YYYY-MM-DD HH:mm') }}</p>

                <p class="mb-1">
                    {{ servicesTranslations.TService }}: 
                    {{
                        serviceTypeTranslations[appointmentToDelete.service.type]
                        + " (" + appointmentToDelete.service.name + ")"
                    }}
                </p>
                <p class="mb-1">{{ TUsersNames }}: {{ appointmentToDelete.firstName + " " + appointmentToDelete.lastName }}</p>
                <p>{{ TAuthPhone }}: {{ appointmentToDelete.phone }}</p>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { TStaffMember } from '@/constants/StaffTranslations';
import Modal from '@/components/Modal.vue';
import AdminAppointmentsCreate from './AdminAppointmentsCreate.vue';
import FullCalendar from '@/components/FullCalendar.vue'
import { useStaffStore } from '@/stores/staff.store';
import { useAppointmentsStore } from '@/stores/appointments.store';
import { ref, computed, watch } from 'vue';
import * as appointmentTranslations from '@/constants/AppointmentsTranslations';
import * as servicesTranslations from '@/constants/ServicesTranslations';
import { TUsersNames } from '@/constants/UsersTranslations';
import { TAuthPhone } from '@/constants/AuthTranslations';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
import * as dayjs from 'dayjs';
import { ServiceType } from '@/enums/service-type.enum';

const appointmentCreate = ref();
const calendar = ref();
const staffStore = useStaffStore();
const appointmentsStore = useAppointmentsStore();
const query = ref({
    year: dayjs().year(),
    week: dayjs().week(),
});
const chosenDate = ref();
const chosenStaffId = ref(1);
const appointmentToDelete = ref();
const isCreateEventModalOpen = ref(false);
const isDeleteEventModalOpen = ref(false);

const serviceTypeTranslations = {
    [ServiceType.MASSAGE]: servicesTranslations.TServiceTypeMassages,
    [ServiceType.ERGO]: servicesTranslations.TServiceTypeErgo,
    [ServiceType.LOGO]: servicesTranslations.TServiceTypeLogo,
};

staffStore.getAll();
const staff = computed(() => staffStore.staff);

const fetchAppointmentsForStaff = async () => {
    await appointmentsStore.getForMemberForWeek({
        staffId: chosenStaffId.value,
        week: query.value.week,
        year: query.value.year,
    });
};

fetchAppointmentsForStaff();

watch(chosenStaffId, async () => {
    await fetchAppointmentsForStaff();
});

watch(query, async () => {
    await fetchAppointmentsForStaff();
});

const handleCreateAppointment = (event: any) => {
    chosenDate.value = event.date;
    isCreateEventModalOpen.value = true;
};

const handleDeleteAppointment = (event: any) => {
    const id = event.extendedProps.appointmentId;
    appointmentToDelete.value = appointmentsStore.staffAppointments.find(a => a.id === id);
    isDeleteEventModalOpen.value = true;
};

const appointments = computed(() => appointmentsStore.staffAppointments);

const handleQueryUpdate = async (event: any) => {
    query.value = event;
};

const handleSaveCreate = async () => {
    await appointmentCreate.value.save();
};

const handleSaveCreateSucess = async () => {
    isCreateEventModalOpen.value = false;
    await fetchAppointmentsForStaff();
};

const handleSaveDelete = async () => {
    await appointmentsStore.destroy(appointmentToDelete.value.id);
    isDeleteEventModalOpen.value = false;
    await fetchAppointmentsForStaff();
};

const handleCancelDelete = () => {
    appointmentToDelete.value = null;
};
</script>