<template>
    <div class="datepicker-container">
        <label v-if="props.label">
            {{ props.label }}
        </label>

        <DatePicker
            v-model:value="modelValue"
            v-model:open="isOpen"
            @change="handleChange"
            @onUpdate:value="setDate"
            type="datetime"
            format="YYYY-MM-DD HH"
            :show-hour="true"
            :disabledDate="disabledDates"
            :hour-options="availableHours"
        ></DatePicker>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';

const props = defineProps(['label', 'modelValue', 'unavailableDates', 'startDate', 'endDate']);
const emit = defineEmits(['update:modelValue']);

const modelValue = computed(() => props.modelValue);
const isOpen = ref(false);
const unavailableDates = computed(() => props.unavailableDates);
const startDate = computed(() => props.startDate);
const endDate = computed(() => props.endDate);
const disabledDates = ref();
const availableHours = ref();
const workingHours = [8, 9, 10, 11, 13, 14, 15, 16];

const setDate = (date: Date) => {
    emit('update:modelValue', date);
}

const handleChange = (val: Date, type: string) => {
    setDate(val);

    if (type === "date") {
        getAvailableHours(val);
    }

    if (type === "hour") {
        isOpen.value = false;
    }
}

const isDateDisabled = (date: string) => {
    const unavailable = unavailableDates.value[date] || [];

    if (!unavailable.length) return false;

    const arrayFromProxy = Array.from(unavailable);

    const hasAllElems = workingHours.every((elem: any) => arrayFromProxy.includes(elem));

    return hasAllElems;
}

const getDatesBetweenStartAndEnd = () => {
    const dates = [];
    let currentDate = dayjs(startDate.value);

    while (currentDate.isBefore(dayjs(endDate.value))) {
        const formatted = currentDate.format('YYYY-MM-DD');

        const isDisabled = isDateDisabled(formatted);

        if (
               currentDate.day() !== 0
            && currentDate.day() !== 6
            && !isDisabled
        ) {
            dates.push(formatted);
        }

        currentDate = dayjs(currentDate).add(1, 'day');
    }

    return dates;
}

const getAvailableHours = (date: Date) => {
    const formatted = dayjs(date).format('YYYY-MM-DD');
    const unavailable = unavailableDates.value[formatted] || [];

    if (!unavailable.length) {
        return availableHours.value = [ ...workingHours ];
    }

    const available = workingHours.filter(hour => !unavailable.includes(hour));

    availableHours.value = available;
};

const recalculate = () => {
    const availableDates = getDatesBetweenStartAndEnd();

    disabledDates.value = (date: any) => {
        const formatted = dayjs(date).format('YYYY-MM-DD');
        return !availableDates.includes(formatted);
    };
};

defineExpose({ recalculate });

watch(unavailableDates, () => {
    recalculate();
});
</script>

<style scoped>
.mx-datepicker {
    width: 100%;
}
</style>