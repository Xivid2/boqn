<template>
    <div class="wrapper">
        <card class="mb-8">
            <div class="tight-wrapper">

                <form @submit.prevent="register" class="my-8">
                    <h1 class="text-center">
                        Регистрация
                    </h1>
                    <b-input
                        v-model="v$.firstName.$model"
                        :models="v$.firstName"
                        text="Име"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.lastName.$model"
                        :models="v$.lastName"
                        text="Презиме"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.email.$model"
                        :models="v$.email"
                        text="Имейл"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.password.$model"
                        :models="v$.password"
                        type="password"
                        text="Парола"
                    >
                    </b-input>
    
                    <b-input
                        v-model="v$.confirmPassword.$model"
                        :models="v$.confirmPassword"
                        type="password"
                        text="Потвърди парола"
                    >
                    </b-input>
    
                    <v-button
                        :disabled="isFormDisabled"
                        type="submit"
                        block
                    >
                        Регистрация
                    </v-button>
                </form>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive, computed } from "vue";
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';
    import { $error, $success } from '../services/notify.service';
    import useValidate from '@vuelidate/core'
    import { required, maxLength, minLength, email, sameAs } from '@vuelidate/validators';

    const isFormDisabled = ref(false);

    const auth = new AuthService(useHttp);
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

        isFormDisabled.value = true;

        const { data, error } = await auth.register({
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
        });

        if (error) {
            isFormDisabled.value = false;

            return $error(error.response?.data?.message || "Something went wrong");
        }

        $success("You registered successfully!");

        router.push('/login');
    };
</script>