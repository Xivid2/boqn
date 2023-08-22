<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-else>
        <b-input
            :text="translations.TServiceStaff"
            type="select"
            v-model="v$.staffId.$model"
            :models="v$.staffId"
        >
            <option
                v-for="(member, index) in staffMembers"
                :key="index"
                :value="member.id"
            >
                {{ member.user.firstName + " " + member.user.lastName }}
            </option>
        </b-input>

        <b-input
            :text="translations.TServiceType"
            type="select"
            v-model="v$.type.$model"
            :models="v$.type"
        >
            <option :value="ServiceType.MASSAGE">{{ translations.TServiceTypeMassage }}</option>
            <option :value="ServiceType.ERGO">{{ translations.TServiceTypeErgo }}</option>
            <option :value="ServiceType.LOGO">{{ translations.TServiceTypeLogo }}</option>
        </b-input>

        <b-input
            :text="translations.TServiceFormName"
            v-model="v$.name.$model"
            :models="v$.name"
            @update:modelValue="(name: string) => data.name = name"
        ></b-input>

        <b-input
            :text="translations.TServiceFormGoal"
            v-model="v$.goal.$model"
            :models="v$.goal"
        ></b-input>

        <b-input
            :text="translations.TServiceFormLink"
            v-model="v$.imgSrc.$model"
            :models="v$.imgSrc"
        ></b-input>

        <b-input
            :text="translations.TServiceFormShortDescription"
            v-model="v$.shortDescription.$model"
            :models="v$.shortDescription"
            type="textarea"
        ></b-input>

        <b-input
            :text="translations.TServiceFormDescription"
            v-model="v$.description.$model"
            :models="v$.description"
            type="textarea"
        ></b-input>

        <v-row>
            <v-col>
                <b-input
                    :text="translations.TServiceFormDurationMinutes"
                    v-model="v$.duration.$model"
                    :models="v$.duration"
                    number
                ></b-input>
            </v-col>

            <v-col>
                <b-input
                    :text="translations.TServiceFormPrice"
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
import useValidate from '@vuelidate/core'
import { type CreateServiceDto, type UpdateServiceDto } from '@/interfaces/services.interface';
import { required, maxLength, integer, decimal } from '@vuelidate/validators';
import * as translations from '@/constants/ServicesTranslations';
import { ServiceType } from '@/enums/service-type.enum';
import { useStaffStore } from '@/stores/staff.store';
const staffStore = useStaffStore();

staffStore.getAll();

const loading = computed(() => staffStore.loading);

const staffMembers = computed(() => staffStore.staff);

const props = defineProps<{
    data: CreateServiceDto | UpdateServiceDto
}>();

const state = computed(() => props.data);

const rules = computed(() => {
    return {
        staffId: {
            required,
        },
        type: {
            required,
        },
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

const v$ = useValidate(rules, state.value);

const validate = () => {
    v$.value.$touch();

    return !v$.value.$error;
}

defineExpose({ validate });
</script>