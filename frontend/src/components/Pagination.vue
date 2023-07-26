<template>
    <v-pagination
        v-model="page"
        class="pagination"
        rounded="circle"
        :show-first-last-page="true"
        :length="totalPages"
        :total-visible="5"
        @prev="emit('update:modelValue', $event)"
        @next="emit('update:modelValue', $event)"
    >
    </v-pagination>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const emit = defineEmits(['update:modelValue', 'onConfirm']);
const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
});

const page = computed(() => props.modelValue);
const totalPages = computed(() => props.totalPages);
</script>