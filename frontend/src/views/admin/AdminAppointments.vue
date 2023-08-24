<template>
    <div class="wrapper mt-16 mb-8">
        <card>
            <FullCalendar />
        </card>
    </div>
</template>

<script lang="ts" setup>
import FullCalendar from '@/components/FullCalendar.vue';
import { useStaffStore } from '@/stores/staff.store';
const staffStore = useStaffStore();

staffStore.getAll();
</script>