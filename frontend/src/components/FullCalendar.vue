<template>
    <FullCalendar
        ref="fullCalendar"
        :options="calendarOptions"
    />
</template>

<script lang="ts" setup>
    import { ref, computed, watch } from 'vue';
    import FullCalendar from '@fullcalendar/vue3';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import bgLocale from '@fullcalendar/core/locales/bg';
    import { TToday } from '@/constants/global';
    import * as dayjs from 'dayjs';
    import weekOfYear from 'dayjs/plugin/weekOfYear';
    dayjs.extend(weekOfYear);
    const currentYear = new Date().getFullYear();
    const currentWeek = dayjs().week();

    const props = defineProps(["events"]);
    const emit = defineEmits(['dateClicked', 'queryUpdated']);

    const events = computed(() => props.events.map(ev => {
        return {
            title: `${ev.firstName} ${ev.lastName} (${ev.service.name})`,
            start: ev.date,
            allDay: false,
        };
    }));
    const fullCalendar = ref();

    const query = ref({
        year: currentYear,
        week: currentWeek,
    });

    watch(query, (val) => {
        emit("queryUpdated", val);
    });

    const dateClick = (event: any) => {
        emit("dateClicked", event);
    };

    const updateQuery = (date: Date) => {
        query.value = {
            year: dayjs(date).year(),
            week: dayjs(date).week(),
        };
    };

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
                        const calendarApi = fullCalendar.value.getApi();
                        calendarApi.today();

                        updateQuery(new Date());
                    }
                },
                prev: {
                    click: async () => {
                        const api = fullCalendar.value.getApi();
                        api.prev();

                        updateQuery(api.view.activeStart);
                    }
                },
                next: {
                    click: async () => {
                        const api = fullCalendar.value.getApi();
                        api.next();

                        updateQuery(api.view.activeStart);
                    }
                }
            }
        }
    });
</script>