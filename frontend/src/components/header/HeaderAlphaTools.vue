<template>
    <div class="wide-wrapper">
        <div class="header-alpha__tools">
            <div class="header-alpha__tools__connections">
                <LinkWithIcon
                    src="tel:+359887107087"
                    icon="fa-solid fa-phone-flip"
                    text="0887107087"
                    isHorizontal
                />

                <LinkWithIcon
                    src="https://maps.google.com/?q=гр. Казанлък, ул. Хината 14"
                    icon="fa-solid fa-location-pin"
                    text="гр. Казанлък, ул. Хината 14"
                    isHorizontal
                />
            </div>

            <div class="header-alpha__tools__button">
                <v-button @click="handleClick">
                    {{ signInText.toUpperCase() }}
                </v-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LinkWithIcon from '../LinkWithIcon.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const router = useRouter();

const signInText = computed(() => {
    return authStore.isAuthenticated ? "Акаунт" : "Впиши се";
});

const handleClick = async () => {
    if (authStore.isAuthenticated) {
        router.push('/profile');
    } else {
        router.push('/login');
    }
};
</script>

<style scoped>
.header-alpha__tools {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.header-alpha__tools__connections {
    width: max(30%, 450px);
    display: flex;
    justify-content: space-between;
}
</style>