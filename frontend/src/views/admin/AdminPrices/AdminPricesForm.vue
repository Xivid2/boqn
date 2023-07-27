<template>
    <div>
        <b-input
            text="Име"
            :modelValue="data.name"
            @update:modelValue="(name: string) => data.name = name"
        ></b-input>

        <b-input
            text="Цел"
            v-model="data.goal"
        ></b-input>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { type CreateMassageDto } from '@/services/massage.service';
import useValidate from '@vuelidate/core'
import { required, maxLength, integer, decimal } from '@vuelidate/validators';

const props = defineProps<{
    data: CreateMassageDto
}>();

const data = computed(() => props.data);

const validationRules = computed(() => {
    return {
        name: {
            required,
            maxLength: maxLength(100),
        },
        goal: {
            required,
            maxLength: maxLength(255),
        },
        description: {
            required,
            maxLength: maxLength(500),
        },
        duration: {
            required,
            integer,
        },
        price: {
            required,
            decimal,
        },
    }
});

const v$ = useValidate(validationRules, data);
</script>