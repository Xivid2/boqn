import { defineStore } from 'pinia';
import { $error, $success } from '@/services/notify.service';
import * as translations from '@/constants/AppointmentsTranslations';
import { AppointmentsService } from '@/services/appointment.service';
import type { AppointmentsByPeriod, CreateAppointmentDto, AppointmentsByStaffForWeek, Appointment } from '@/interfaces/appointments.interface';

interface AppointmentsState {
    loading: boolean;
    error: string;
    appointments: Appointment[];
    staffAppointments: Appointment[],
}

export const useAppointmentsStore = (options = {}) => {
    const appointmentsService = new AppointmentsService();

    return defineStore('appointments', {
        state: (): AppointmentsState => ({
            loading: false,
            error: "",
            appointments: [],
            staffAppointments: [],
        }),
        actions: {
            prepareAction() {
                this.loading = true;
                this.error = '';
            },
            async getForPeriod(query: AppointmentsByPeriod) {
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
            async getForMemberForWeek(query: AppointmentsByStaffForWeek) {
                this.staffAppointments = [];
                this.prepareAction();

                try {
                    const { data } = await appointmentsService.getForStaffForWeek(query);

                    this.staffAppointments = data;
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAppointmentsCannotGetForStaffForWeek;

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