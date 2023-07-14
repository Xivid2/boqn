<template>
    <div class="d-flex align-center justify-center">
        <v-sheet width="400" class="mx-auto mt-16">
            <h1 class="block text-center">
                Login
            </h1>

            <v-form fast-fail @submit.prevent="login">
                <v-text-field
                     variant="underlined"
                     v-model="email"
                     label="email"
                ></v-text-field>

                <v-text-field
                    variant="underlined"
                    type="password"
                    v-model="password"
                    label="password"
                ></v-text-field>

                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                <v-btn
                    type="submit"
                    variant="outlined"
                    color="primary"
                    block class="mt-2"
                >
                    Sign in
                </v-btn>
            </v-form>

            <div class="mt-2">
                <p class="text-body-2">
                    Don't have an account?
                    <router-link to="/register">
                        Sign Up
                    </router-link>
                </p>
            </div>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '../stores/auth.store';
    import { ref } from "vue";
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';

    const authStore = useAuthStore();
    const auth = new AuthService(useHttp);
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const login = async () => {
        const { data, error } = await auth.login(email.value, password.value);

        if (error) {
            return console.log('error', error);
        }

        const { access_token } = data;

        authStore.setToken(access_token);

        if (authStore.isAuthenticated) {
            router.push('/');
        }

    };
</script>