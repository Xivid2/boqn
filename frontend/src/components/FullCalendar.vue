<template>
    <b-input
        :text="TStaffMember"
        type="select"
        @change="chosenStaffId = $event.target.value"
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
        ref="fullCalendar"
        :options="calendarOptions"
    />
</template>

<script lang="ts" setup>
    import { ref, reactive, computed, watch } from 'vue';
    import { useStaffStore } from '@/stores/staff.store';
    const staffStore = useStaffStore();
    import { useAppointmentsStore } from '@/stores/appointments.store';
    const appointmentsStore = useAppointmentsStore();
    import FullCalendar from '@fullcalendar/vue3';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import bgLocale from '@fullcalendar/core/locales/bg';
    import { TToday } from '@/constants/global';
    import { TStaffMember } from '@/constants/StaffTranslations';
    import * as dayjs from 'dayjs';
    import weekOfYear from 'dayjs/plugin/weekOfYear';
    dayjs.extend(weekOfYear);

    const emit = defineEmits(['dateClicked', 'chosenStaffId']);

    const fullCalendar = ref();
    const staff = computed(() => staffStore.staff);
    const chosenStaffId = ref(1);
    const appointments = computed(() => appointmentsStore.staffAppointments);
    const events = ref([]);

    const navigation = reactive({
        currentYear: new Date().getFullYear(),
        selectedYear: new Date().getFullYear(),
        currentWeek: dayjs().week(),
        selectedWeek: dayjs().week()
    });

    const getSchedule = async () => {
        await appointmentsStore.getForMemberForWeek({
            staffId: chosenStaffId.value,
            year: +navigation.selectedYear,
            week: +navigation.selectedWeek,
        });
    };

    getSchedule();

    watch(chosenStaffId, async () => {
        await getSchedule();
    });

    watch(appointments, (val) => {
        events.value = val.map(ev => {
            return {
                title: `${ev.user.firstName} ${ev.user.lastName} (${ev.service.name})`,
                start: ev.date,
                allDay: false,
            };
        });
    });

    const dateClick = (event: any) => {
        emit("dateClicked", event);
        emit("chosenStaffId", chosenStaffId);
    }

    const calendarOptions = computed(() => {
        return {
            plugins: [ timeGridPlugin, interactionPlugin ],
            initialView: 'timeGridWeek',
            locale: bgLocale,
            slotDuration: "01:00:00",
            allDaySlot: false,
            expandRows: true,
            dateClick: dateClick,
            // TODO: Take them from config ?
            slotMinTime: "08:00",
            slotMaxTime: "17:00",
            events: events.value,
            customButtons: {
                today: {
                    text: TToday,
                    click: async () => {
                        navigation.selectedWeek = navigation.currentWeek;
                        navigation.selectedYear = navigation.currentYear;

                        await getSchedule();
                        const calendarApi = fullCalendar.value.getApi();
                        calendarApi.today();
                    }
                },
                prev: {
                    click: async () => {
                        const api = fullCalendar.value.getApi();
                        api.prev();

                        const start = api.view.activeStart;
                        navigation.selectedWeek = dayjs(start).week();

                        await getSchedule();
                    }
                },
                next: {
                    click: async () => {
                        const api = fullCalendar.value.getApi();
                        api.next();

                        const start = api.view.activeStart;
                        navigation.selectedWeek = dayjs(start).week();

                        await getSchedule();
                    }
                }
            }
        }
    });
</script>