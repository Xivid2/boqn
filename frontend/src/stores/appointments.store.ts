import { defineStore } from 'pinia';
import { $error, $success } from '@/services/notify.service';
import * as translations from '@/constants/AppointmentsTranslations';
import { AppointmentsService } from '@/services/appointment.service';
import type { AppointmentsByPeriod, CreateAppointmentDto, AppointmentsByStaffForWeek, AppointmentsState } from '@/interfaces/appointments.interface';
import type { IPagination } from '@/interfaces/global.interfaces';

export const useAppointmentsStore = (options = {}) => {
    const appointmentsService = new AppointmentsService();

    return defineStore('appointments', {
        state: (): AppointmentsState => ({
            loading: false,
            error: "",
            pages: 1,
            appointments: [],
            staffAppointments: [],
            userAppointments: [],
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
            async destroy(id: number) {
                this.prepareAction();

                try {
                    await appointmentsService.destroy(id);

                    $success(translations.TAppointmentsDeletedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAppointmentsCannotDelete;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async destroyOwn(userId: number, id: number) {
                this.prepareAction();

                try {
                    await appointmentsService.destroyOwn(userId, id);

                    $success(translations.TAppointmentsDeletedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAppointmentsCannotDelete;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async getUserAppointments(userId: number, query: IPagination) {
                this.userAppointments = [];
                this.prepareAction();

                try {
                    const { data } = await appointmentsService.getForUser(userId, query);

                    this.userAppointments = data.appointments;
                    this.pages = data.pages;
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAppointmentsCannotGetForUser;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            }
        },
    })();
}