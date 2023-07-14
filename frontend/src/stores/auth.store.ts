import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.accessToken;
        }
    },
    actions: {
        setToken(accessToken: string) {
            this.accessToken = accessToken;
        },
        setUnauthenticated() {
            this.accessToken = '';
        }
    },
});