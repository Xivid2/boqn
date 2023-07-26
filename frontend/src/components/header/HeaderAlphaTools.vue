<template>
    <div class="mx-16 py-4">
        <v-row>
            <v-col cols="2">
                <fai icon="fa-solid fa-phone-flip" class="fa-xl" />

                <a
                    class="flex items-center"
                    href="tel:0887107087"
                >
                    0887107087
                </a>
            </v-col>

            <v-col cols="3" class="ml-4">
                <fai icon="fa-solid fa-location-pin" class="fa-xl" />

                <a
                    href="https://maps.google.com/?q=гр. Казанлък, ул. Хината 14"
                    target="_blank"
                    class="ml-2"
                >
                    гр. Казанлък, ул. Хината 14
                </a>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="1" class="text-right">
                <v-button @click="handleClick">
                    {{ signInText.toUpperCase() }}
                </v-button>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const router = useRouter();

const signInText = computed(() => {
    return authStore.isAuthenticated ? "My account" : "Sign in";
});

const handleClick = async () => {
    if (authStore.isAuthenticated) {
        router.push('/profile');
    } else {
        router.push('/login');
    }
};
</script>