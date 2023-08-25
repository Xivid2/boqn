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
                @date-clicked="handleDateClick"
                @query-updated="handleQueryUpdate"
                :events="appointments"
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
                <AdminAppointmentsCreate
                    ref="appointmentCreate"
                    :date="chosenDate"
                    :staffId="chosenStaffId"
                />
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
import { TAppointmentsAppointmentCreate } from '@/constants/AppointmentsTranslations';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
import * as dayjs from 'dayjs';

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
const isCreateEventModalOpen = ref(false);


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

const handleCancel = () => {
    isCreateEventModalOpen.value = false;
};

const handleDateClick = (event: any) => {
    chosenDate.value = event.date;
    isCreateEventModalOpen.value = true;
};

const appointments = computed(() => appointmentsStore.staffAppointments);
console.log('appointments:', appointments)

const handleQueryUpdate = async (event: any) => {
    query.value = event;
};

const onSave = async () => {
    await appointmentCreate.value.save();
    isCreateEventModalOpen.value = false;
    await fetchAppointmentsForStaff();
};
</script>