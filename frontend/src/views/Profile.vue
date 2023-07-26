<template>
    <div class="d-flex align-center justify-center">
        <v-sheet
            width="500"
            class="mx-auto mt-16 py-12 px-16"
            :elevation="20"
        >
            <h1 class="block text-center">
                Акаунт
            </h1>

            <v-button
                v-if="isAdmin"
                block
                class="mt-2"
            >
                <router-link to="/admin">
                    ADMIN PANEL
                </router-link>
            </v-button>

            <v-button
                class="mt-16"
                block
                @click="logout"
            >
                LOGOUT
            </v-button>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useAuthStore } from '../stores/auth.store';
    import { useNotification } from '@kyvg/vue3-notification';
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';

    const { notify } = useNotification();
    const authStore = useAuthStore();
    const auth = new AuthService(useHttp);
    const router = useRouter();

    const isAdmin = computed(() => authStore.isAdmin );

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