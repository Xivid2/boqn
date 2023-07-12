<template>
    <form @submit.prevent="login" class="bg-green w-50" v-if="!loading">
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

<script lang="ts">
import { useAuthStore } from '../../stores/auth.store';
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRouter } from 'vue-router'
import AuthService from "../../services/auth.service";
import { useHttp } from '../../plugins/api';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const auth = new AuthService(useHttp);
        const router = useRouter();
        
        const loading = ref(true);

        const email = ref("");
        const password = ref("");

        const onLogin = (response: any) => {
            const { data, error } = response;

            if (error) return console.log('error', error);

            const { access_token, refresh_token } = data;

            authStore.setTokens(access_token, refresh_token);
        }

        const login = async () => {
            const response = await auth.login(email.value, password.value);

            onLogin(response);
        }

        const refreshTokens = async () => {
            const response = await auth.refreshTokens();

            onLogin(response);
        }

        return {
            refreshTokens,
            login,
            email,
            password,
            router,
            loading,
        };
    },
    async created() {
        await this.refreshTokens();

        this.loading = false;

        this.router.push('/');
    }
})


</script>