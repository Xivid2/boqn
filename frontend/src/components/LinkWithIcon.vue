<template>
    <a
        :href="props.src"
        class="text-center"
        @mouseover="applyShadow = true"
        @mouseout="applyShadow = false"
    >
        <p class="mb-2">
            <fai :icon="props.icon" class="fa-xl" />
        </p>

        <span :class="{ shadowed: applyShadow }">
            {{ props.text }}
        </span>
    </a>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const props = defineProps({
        src: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    });

    const applyShadow = ref(false);
</script>