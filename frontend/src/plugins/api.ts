import { useAuthStore } from "@/stores/auth.store";
import { inject } from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((request): any => {
    console.log('request:', request)
    const authStore = useAuthStore();

    request.headers.Authorization = `Bearer ${authStore.accessToken}`
});

const injectionKey = Symbol('http');

export const useHttp = () => inject(injectionKey);

export const plugin = {
    install(app: any) {
        const http = axiosInstance;

        app.provide(injectionKey, http);
        app.config.globalProperties.$http = http;
    }
}