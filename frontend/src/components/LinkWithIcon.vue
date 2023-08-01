<template>
    <a
        :href="props.src"
        class="shadowed"
    >
        <p class="mb-2">
            <fai :icon="props.icon" class="fa-xl" />
        </p>

        {{ props.text }}
    </a>
</template>

<script lant="ts" setup>
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
</script>