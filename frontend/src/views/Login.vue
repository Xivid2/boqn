<template>
    <div class="wrapper">
        <card class="mb-8">
            <div class="tight-wrapper">
                <form @submit.prevent="login" class="my-8">
                    <h1 class="text-center">
                        {{ translations.TAuthSignIn }}
                    </h1>
    
                    <b-input
                        v-model="v$.email.$model"
                        :models="v$.email"
                        :text="translations.TAuthEmail"
                    />
    
                    <b-input
                        v-model="v$.password.$model"
                        :models="v$.password"
                        :text="translations.TAuthPassword"
                        type="password"
                    />
    
                    <a href="#">
                        <h5>
                            {{ translations.TAuthForgottenPasswordQuestion }}
                        </h5>
                    </a>
    
                    <v-button
                        type="submit"
                        class="mt-4"
                        block
                    >
                        {{ translations.TAuthLogin }}
                    </v-button>
    
                    <p class="text-body-2 mt-4">
                        {{ translations.TAuthDontHaveAccountQuestion }}
                        <span class="primary-color">
                            <RouterLink to="/register">
                                {{ translations.TAuthRegistration }}
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
    import { reactive, computed } from "vue";
    import { useRouter } from 'vue-router'
    import useValidate from '@vuelidate/core'
    import { required, maxLength, minLength, email } from '@vuelidate/validators';
    import * as translations from '@/constants/AuthTranslations';

    const authStore = useAuthStore();
    const router = useRouter();

    const error = computed(() => authStore.error);

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

        await authStore.login(state.email, state.password);

        if (authStore.isAuthenticated && !error.value) {
            router.push('/');
        }
    };
</script>