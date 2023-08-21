import { useAuthStore } from "@/stores/auth.store";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((request): any => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated && request.url !== '/auth/refresh') {
        request.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }

    return request;
});

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const authStore = useAuthStore();

        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/refresh" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await axiosInstance.post("/auth/refresh");

                    const { access_token } = rs.data;

                    authStore.setToken(access_token);

                    return axiosInstance(originalConfig);
                } catch (_error) {
                    authStore.setUnauthenticated();

                    return Promise.reject(_error);
                }
            }
        }

        if (originalConfig.url === "/auth/refresh" && err.response) {
            authStore.setUnauthenticated();
        }

        return Promise.reject(err);
    }
);

export const http = axiosInstance;