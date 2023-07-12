import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
    }),
    actions: {
        setToken(accessToken: string, refreshToken: string) {
            this.accessToken = accessToken;
        },
    },
});