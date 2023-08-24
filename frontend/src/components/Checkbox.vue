<template>
    <label class="checkbox-container mb-8">
        <input
            :checked="modelValue"
            type="checkbox"
            :value="modelValue"
            class="checkbox"
            v-bind="$attrs"
            @change="emit('update:modelValue', !modelValue)"
        />

        <span class="checkbox-text ml-2">
            {{ text }}
        </span>
    </label>
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Boolean,
    },
    text: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(["update:modelValue"])
</script>