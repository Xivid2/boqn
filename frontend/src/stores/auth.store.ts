import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: '',
        role: '',
        isInitialRefreshComplete: false,
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.accessToken;
        },
        isAdmin(): boolean {
            return this.role === "admin";
        },
    },
    actions: {
        setToken(accessToken: string) {
            this.accessToken = accessToken;
        },
        setRole(role: string) {
            this.role = role;
        },
        setUnauthenticated() {
            this.accessToken = '';
        }
    },
});