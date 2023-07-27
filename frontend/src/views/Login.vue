<template>
    <div class="wrapper">
        <card class="d-flex justify-center">
            <form @submit.prevent="login" class="login-form">
                <h1 class="mb-16 text-center">
                    Вписване
                </h1>

                <b-input
                    v-model="v$.email.$model"
                    :models="v$.email"
                    text="email"
                >
                </b-input>

                <b-input
                    v-model="v$.password.$model"
                    :models="v$.password"
                    text="password"
                    type="password"
                >
                </b-input>

                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                <v-button
                    type="submit"
                    class="mt-4"
                    block
                >
                    SIGN IN
                </v-button>

                <p class="text-body-2 mt-4">
                    Don't have an account?
                    <router-link to="/register">
                        Sign Up
                    </router-link>
                </p>
            </form>
        </card>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '../stores/auth.store';
    import { useNotification } from "@kyvg/vue3-notification";
    import { reactive, computed } from "vue";
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';
    import useValidate from '@vuelidate/core'
    import { required, maxLength, minLength, email } from '@vuelidate/validators';
    
    const { notify}  = useNotification();
    const authStore = useAuthStore();
    const auth = new AuthService(useHttp);
    const router = useRouter();

    const state = reactive({
        email: '',
        password: '',
    });

    const rules = computed(() => {
        return {
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
        };
    });

    const v$ = useValidate(rules, state);

    const login = async () => {
        v$.value.$touch();

        if (v$.value.$error) return;

        const { data, error } = await auth.login(state.email, state.password);

        if (error) {
            return notify({
                type: "error",
                text: error.response?.data?.message || "Something went wrong",
            });
        }

        const { access_token, role } = data;

        authStore.setToken(access_token);
        authStore.setRole(role);

        if (authStore.isAuthenticated) {
            router.push('/');
        }

    };
</script>