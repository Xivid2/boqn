<template>
    <div class="d-flex align-center justify-center">
        <v-sheet width="400" class="mx-auto mt-16">
            <h1 class="block text-center">
                My account
            </h1>

            <v-btn
                @click="logout"
                type="submit"
                variant="outlined"
                color="primary"
                block class="mt-2"
            >
                Logout
            </v-btn>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '../stores/auth.store';
    import { useNotification } from '@kyvg/vue3-notification';
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';

    const { notify } = useNotification();
    const authStore = useAuthStore();
    const auth = new AuthService(useHttp);
    const router = useRouter();

    const logout = async () => {
        const { error } = await auth.logout();

        if (error) {
            return notify({
                type: "error",
                text: error.response?.data?.message || "Something went wrong",
            });
        }

        authStore.setUnauthenticated();

        router.push('/');
    };
</script>