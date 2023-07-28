<template>
    <div class="wrapper">
        <card>
            <h1 class="block text-center">
                Акаунт
            </h1>
    
            <v-button
                v-if="isAdmin"
                block
                class="mt-8"
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
        </card>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useAuthStore } from '../stores/auth.store';
    import { $error } from '@/services/notify.service';
    import { useRouter } from 'vue-router'
    import AuthService from "@/services/auth.service";
    import { useHttp } from '../plugins/api';

    const authStore = useAuthStore();
    const auth = new AuthService(useHttp);
    const router = useRouter();

    const isAdmin = computed(() => authStore.isAdmin );

    const logout = async () => {
        const { error } = await auth.logout();

        if (error) {
            return $error(error.response?.data?.message || "Something went wrong");
        }

        authStore.setUnauthenticated();

        router.push('/');
    };
</script>