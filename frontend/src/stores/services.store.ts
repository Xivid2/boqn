import { defineStore } from 'pinia';
import { ServicesService } from '@/services/services.service';
import { type Service, type UpdateServiceDto, type CreateServiceDto } from '@/interfaces/services.interface';
import { ServiceType } from '@/enums/service-type.enum';
import { $error, $success } from '@/services/notify.service';
import * as translations from '@/constants/ServicesTranslations';

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
                    const err = error.response?.data?.message || translations.TServiceCannotGet;

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
                    const err = error.response?.data?.message || translations.TServiceCannotGetAll;

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

                    $success(translations.TServiceCreatedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TServiceCannotCreate;

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

                    $success(translations.TServiceUpdatedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TServiceCannotUpdate;

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

                    $success(translations.TServiceDeletedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TServiceCannotDelete;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            }
        },
    })();
}