<template>
    <a
        class="link-with-icon"
        :href="props.src"
        :style="{
            'flex-direction': props.isHorizontal ? 'row' : 'column'
        }"
        @mouseover="applyShadow = true"
        @mouseout="applyShadow = false"
    >
        <p :class="{
            'mb-2': !props.isHorizontal,
            'mr-2': props.isHorizontal
        }">
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
        },
        isHorizontal: {
            type: Boolean,
            required: false,
            default: false,
        }
    });

    const applyShadow = ref(false);
</script>

<style scoped>
.link-with-icon {
    display: flex;
    align-items: center;
}
</style>