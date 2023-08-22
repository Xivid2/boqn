<template>
    <div class="wrapper">
        <card class="mb-8">
            <div class="tight-wrapper">

                <form @submit.prevent="register" class="my-8">
                    <h1 class="text-center">
                        {{ translations.TAuthRegistration }}
                    </h1>
                    <b-input
                        v-model="v$.firstName.$model"
                        :models="v$.firstName"
                        :text="translations.TAuthFirstName"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.lastName.$model"
                        :models="v$.lastName"
                        :text="translations.TAuthLastName"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.email.$model"
                        :models="v$.email"
                        :text="translations.TAuthEmail"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.password.$model"
                        :models="v$.password"
                        type="password"
                        :text="translations.TAuthPassword"
                    >
                    </b-input>

                    <b-input
                        v-model="v$.confirmPassword.$model"
                        :models="v$.confirmPassword"
                        type="password"
                        :text="translations.TAuthConfirmPassword"
                    >
                    </b-input>
    
                    <v-button
                        :disabled="loading"
                        type="submit"
                        block
                    >
                        {{ translations.TAuthRegistration }}
                    </v-button>
                </form>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, computed } from "vue";
    import { useRouter } from 'vue-router'
    import useValidate from '@vuelidate/core'
    import { required, maxLength, minLength, email, sameAs } from '@vuelidate/validators';
    import * as translations from '@/constants/AuthTranslations';
    import { useAuthStore } from "@/stores/auth.store";
    const authStore = useAuthStore();

    const loading = computed(() => authStore.loading);
    const error = computed(() => authStore.error);

    const router = useRouter();

    const state = reactive({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const rules = computed(() => {
        return {
            firstName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50),
            },
            lastName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50),
            },
            email: {
                email,
                required,
                maxLength: maxLength(255),
            },
            password: {
                required,
                maxLength: maxLength(50),
                minLength: minLength(8),
            },
            confirmPassword: {
                sameAsPassword: sameAs(state.password),
            }
        };
    });

    const v$ = useValidate(rules, state);

    const register = async () => {
        v$.value.$touch();

        if (v$.value.$error) return;

        await authStore.register({
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
        });

        if (!error.value) {
            router.push('/login');
        }
    };
</script>