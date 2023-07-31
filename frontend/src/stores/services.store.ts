import { defineStore } from 'pinia';
import { type Service, ServicesService } from '@/services/services.service';

interface ServicesState {
    services: Service[];
}

export const useServicesStore = (options = {}) => {
    const http = options.useHttp || null;
    const $error = options.$error || null;

    return defineStore('services', {
        state: (): ServicesState => ({
            services: [],
        }),
        getters: {
            massages(): Service[] {
                return this.services.filter(service => service.type === "MASSAGE");
            }
        },
        actions: {
            resetServices() {
                this.services = [];
            },
            setServices(services: Service[]) {
                this.services = services;
            },
            async getAll() {
                const servicesService = new ServicesService(http);

                const { data, error } = await servicesService.getAll();

                if (error) {
                    this.resetServices();
                    return $error(error.response?.data?.message || "Something went wrong");
                }

                this.setServices(data);
            }
        },
    })();
}