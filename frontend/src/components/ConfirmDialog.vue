<template>
    <v-row justify="center">
        <v-dialog
            v-model="isOpen"
            persistent
            width="auto"
        >
            <v-card class="py-12 px-16 text-center">
                <v-card-title class="text-h5" v-if="title">
                    {{ title }}
                </v-card-title>

                <v-card-text>
                    {{ text }}
                </v-card-text>

                <v-card-actions class="d-flex justify-center">
                    <v-button @click="emit('onConfirm')">
                        Потвърди
                    </v-button>

                    <v-button
                        @click="emit('update:modelValue', false);"
                        variant="secondary"
                        class="ml-8"
                    >
                        Откажи
                    </v-button>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue', 'onConfirm']);

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: "",
    },
    text: {
        type: String,
        default: "",
        required: true,
    },
});

const isOpen = computed(() => props.modelValue);
const title = computed(() => props.title);
const text = computed(() => props.text);
</script>