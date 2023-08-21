import { defineStore } from 'pinia';
import { ServicesService } from '@/services/services.service';
import { type Service, type UpdateServiceDto, type CreateServiceDto } from '@/interfaces/services.interface';
import { ServiceType } from '@/enums/service-type.enum';
import { $error, $success } from '@/services/notify.service';

interface ServicesState {
    loading: boolean;
    error: string;
    service: Service | null;
    services: Service[];
}

export const useServicesStore = (options = {}) => {
    const servicesService = new ServicesService();

    return defineStore('services', {
        state: (): ServicesState => ({
            loading: false,
            error: "",
            service: null,
            services: [],
        }),
        getters: {
            massages(): Service[] {
                return this.services.filter(service => service.type === ServiceType.MASSAGE);
            },
            logos(): Service[] {
                return this.services.filter(service => service.type === ServiceType.LOGO);
            },
            ergos(): Service[] {
                return this.services.filter(service => service.type === ServiceType.ERGO);
            },
        },
        actions: {
            prepareAction() {
                this.loading = true;
                this.error = '';
            },
            async get(id: number) {
                this.service = null;
                this.prepareAction();

                try {
                    const { data } = await servicesService.get(id);

                    this.service = data;
                } catch (error) {
                    const err = error.response?.data?.message || "Възникна проблем при зареждането на услугите";

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async getAll() {
                this.services = [];
                this.prepareAction();

                try {
                    const { data } = await servicesService.getAll();

                    this.services = data;
                } catch (error) {
                    const err = error.response?.data?.message || "Възникна проблем при зареждането на услугите";

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async create(createServiceDto: CreateServiceDto) {
                this.prepareAction();

                try {
                    await servicesService.create(createServiceDto);

                    $success("Узпешно създаване");
                } catch (error) {
                    const err = error.response?.data?.message || "Възникна проблем при създаването на услуга";

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async update(id: number, updateServiceDto: UpdateServiceDto) {
                this.prepareAction();

                try {
                    await servicesService.update(id, updateServiceDto);

                    $success("Узпешно обновяване");
                } catch (error) {
                    const err = error.response?.data?.message || "Възникна проблем при обновяването на услугата";

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async destroy(id: number) {
                this.prepareAction();

                try {
                    await servicesService.destroy(id);

                    $success("Узпешно изтриване");
                } catch (error) {
                    const err = error.response?.data?.message || "Възникна проблем при изтриването на услугата";

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            }
        },
    })();
}