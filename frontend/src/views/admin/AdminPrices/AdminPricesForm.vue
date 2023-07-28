<template>
    <div>
        <b-input
            text="Име"
            v-model="v$.name.$model"
            :models="v$.name"
            @update:modelValue="(name: string) => data.name = name"
        ></b-input>

        <b-input
            text="Цел"
            v-model="v$.goal.$model"
            :models="v$.goal"
        ></b-input>

        <b-input
            text="Линк към изображение"
            v-model="v$.imgSrc.$model"
            :models="v$.imgSrc"
        ></b-input>

        <b-input
            text="Кратко описание"
            v-model="v$.shortDescription.$model"
            :models="v$.shortDescription"
            type="textarea"
        ></b-input>

        <b-input
            text="Описание"
            v-model="v$.description.$model"
            :models="v$.description"
            type="textarea"
        ></b-input>

        <v-row>
            <v-col>
                <b-input
                    text="Продължителност (минути)"
                    v-model="v$.duration.$model"
                    :models="v$.duration"
                    number
                ></b-input>
            </v-col>

            <v-col>
                <b-input
                    text="Цена"
                    v-model="v$.price.$model"
                    :models="v$.price"
                    number
                ></b-input>
            </v-col>
        </v-row>
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

const rules = computed(() => {
    return {
        name: {
            required,
            maxLength: maxLength(100),
        },
        goal: {
            required,
            maxLength: maxLength(255),
        },
        imgSrc: {
            required,
        },
        shortDescription: {
            required,
            maxLength: maxLength(500),
        },
        description: {
            required,
            maxLength: maxLength(5000),
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

const v$ = useValidate(rules, data);

const validate = () => {
    v$.value.$touch();

    return !v$.value.$error;
}

defineExpose({ validate });
</script>