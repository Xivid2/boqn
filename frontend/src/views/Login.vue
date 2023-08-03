<template>
    <div class="wrapper">
        <card class="mb-8">
            <div class="tight-wrapper">
                <form @submit.prevent="login" class="my-8">
                    <h1 class="text-center">
                        Вписване
                    </h1>
    
                    <b-input
                        v-model="v$.email.$model"
                        :models="v$.email"
                        text="Имейл"
                    />
    
                    <b-input
                        v-model="v$.password.$model"
                        :models="v$.password"
                        text="Парола"
                        type="password"
                    />
    
                    <a href="#">
                        <h5>
                            Забравена парола?
                        </h5>
                    </a>
    
                    <v-button
                        type="submit"
                        class="mt-4"
                        block
                    >
                        Вход
                    </v-button>
    
                    <p class="text-body-2 mt-4">
                        Нямате акаунт?
                        <span class="primary-color">
                            <RouterLink to="/register">
                                Регистрация
                            </RouterLink>
                        </span>
                    </p>
                </form>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '../stores/auth.store';
    import { $error } from '@/services/notify.service';
    import { reactive, computed } from "vue";
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';
    import useValidate from '@vuelidate/core'
    import { required, maxLength, minLength, email } from '@vuelidate/validators';

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
            return $error(error.response?.data?.message || "Something went wrong");
        }

        const { access_token, role } = data;

        authStore.setToken(access_token);
        authStore.setRole(role);

        if (authStore.isAuthenticated) {
            router.push('/');
        }
    };
</script>