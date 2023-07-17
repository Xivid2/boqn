<template>
    <DatePicker
        v-model:value="modelValue"
        @change="onChange"
        @onUpdate:value="setDate"
        type="datetime"
        format="YYYY-MM-DD"
        :show-hour="true"
        :disabledDate="isDateDisabled"
        :hour-options="chosenDateOptions"
        ></DatePicker>
        <!-- :disabledTime="isTimeDisabled" -->
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps(['modelValue']);

const modelValue = ref(props.modelValue);

const onChange = (val: any) => {
    isTimeDisabled(val);
}

const setDate = (value: any) => {
  emit("update:modelValue", value);
};

const getDatesUntilNextMonth = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    nextMonth.setDate(0); // Set to the last day of the current month

    const dates = [];
    let currentDate = new Date(today);

    while (currentDate <= nextMonth) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            dates.push(new Date(currentDate).toISOString());
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

const availableDates = getDatesUntilNextMonth();

const isDateDisabled = (date: any) => {
    return !availableDates.includes(date.toISOString());
};

const chosenDateOptions = ref([]);

const isTimeDisabled = (date: any) => {
    chosenDateOptions.value = [8, 9, 10, 11, 13, 14, 15, 16];
};

</script>