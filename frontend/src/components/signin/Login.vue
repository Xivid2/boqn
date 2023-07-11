<template>
    <form @submit.prevent="login" class="bg-green w-50">
        <p>
            <label>
                Email:
            </label>
            <input v-model="email" />
        </p>

        <p>
            <label>
                Password:
            </label>
            <input v-model="password" type="password" />
        </p>

        <button type="submit">Login</button>

        <button type="submit">Logout</button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useHttp } from '../../plugins/api';
const http = useHttp();

import { useAuthStore } from '../../stores/auth.store';

const authStore = useAuthStore();

const email = ref("boris.marinov99@gmail.com");
const password = ref("devil666Zeroid2!");

const login = async () => {
    const response = await http.post('/auth/login', {
        email: email.value,
        password: password.value,
    });

    console.log('da', response);

    const { access_token, refresh_token } = response.data;
    authStore.setTokens(access_token, refresh_token);

    console.log('this', this);
    console.log('1', authStore.accessToken)
    console.log('2', authStore.refreshToken)
}
</script>