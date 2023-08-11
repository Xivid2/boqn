<template>
    <div class="wrapper">
        <card class="py-8">
            <div class="tight-wrapper">
                <h1 class="block text-center">
                    Акаунт
                </h1>
        
                <RouterLink v-if="isAdmin" to="/admin">
                    <v-button
                        block
                        class="mt-8"
                    >
                        Админски панел
                    </v-button>
                </RouterLink>
    
                <v-button
                    class="mt-16"
                    block
                    @click="logout"
                >
                    Изход
                </v-button>
            </div>
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