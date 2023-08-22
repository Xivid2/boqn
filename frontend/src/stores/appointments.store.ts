import { defineStore } from 'pinia';
import { type Service, type UpdateServiceDto, type CreateServiceDto } from '@/interfaces/services.interface';
import { $error, $success } from '@/services/notify.service';
import * as translations from '@/constants/AppointmentsTranslations';
import { AppointmentsService } from '@/services/appointment.service';
import type { AppointmentByPeriod, CreateAppointmentDto } from '@/interfaces/appointments.interface';

interface ServicesState {
    loading: boolean;
    error: string;
    appointments: Service[];
}

export const useAppointmentsStore = (options = {}) => {
    const appointmentsService = new AppointmentsService();

    return defineStore('appointments', {
        state: (): ServicesState => ({
            loading: false,
            error: "",
            appointments: [],
        }),
        actions: {
            prepareAction() {
                this.loading = true;
                this.error = '';
            },
            async getForPeriod(query: AppointmentByPeriod) {
                this.appointments = [];
                this.prepareAction();

                try {
                    const { data } = await appointmentsService.getForPeriod(query);

                    this.appointments = data;
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAppointmentsCannotGetForPeriod;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async create(createAppointmentDto: CreateAppointmentDto) {
                this.prepareAction();

                try {
                    await appointmentsService.create(createAppointmentDto);

                    $success(translations.TAppointmentsCreatedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAppointmentsCannotCreate;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
        },
    })();
}