<template>
    <v-dialog v-model="isOpen">
        <div class="wrapper">
            <card>
                <h3 class="text-center">{{ title }}</h3>
                <slot></slot>

                <div class="d-flex justify-center">
                    <v-button @click="emit('onConfirm')">
                        {{ TSave }}
                    </v-button>

                    <v-button
                        @click="onCancel"
                        variant="secondary"
                        class="ml-8"
                    >
                        {{ TCancel }}
                    </v-button>
                </div>
            </card>
        </div>
    </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { TSave, TCancel } from '@/constants/global';

const emit = defineEmits(['update:modelValue', 'onConfirm', 'onCancel']);

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: "",
    },
});

const isOpen = computed(() => props.modelValue);
const title = computed(() => props.title);

const onCancel = () => {
    emit('update:modelValue');
    emit('onCancel');
}
</script>