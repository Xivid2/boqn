<template>
    <div class="wrapper">
        <card class="py-8">
            <div class="tight-wrapper">
                <h1 class="block text-center">
                    {{ TAuthAccount }}
                </h1>

                <RouterLink v-if="isAdmin" to="/admin">
                    <v-button
                        block
                        class="mt-8"
                    >
                        {{ TAdminPanel }}
                    </v-button>
                </RouterLink>

                <v-button
                    class="mt-16"
                    block
                    @click="logout"
                >
                    {{ TAuthSignOut }}
                </v-button>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useAuthStore } from '../stores/auth.store';
    import { useRouter } from 'vue-router'
    import { TAdminPanel } from '@/constants/AdminPanelTranslations';
    import { TAuthAccount, TAuthSignOut } from '@/constants/AuthTranslations';

    const authStore = useAuthStore();
    const router = useRouter();

    const error = computed(() => authStore.error);

    const isAdmin = computed(() => authStore.isAdmin );

    const logout = async () => {
        await authStore.logout();

        if (!error.value && !authStore.isAuthenticated) {
            router.push('/');
        }
    };
</script>