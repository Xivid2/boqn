<template>
    <button
        class="
            button
            py-2
            px-3
        "
        :class="classes"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: "primary",
    },
    block: {
        type: Boolean,
        default: false,
    }
});

const btnType = computed(() => props.variant);

const classes = [
    btnType.value,
    props.block ? 'block' : '',
];
</script>