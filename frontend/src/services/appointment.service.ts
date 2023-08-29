import { http } from "@/plugins/newApi";
import { type AppointmentsByPeriod, type CreateAppointmentDto, type AppointmentsByStaffForWeek } from "@/interfaces/appointments.interface";
import type { IPagination } from "@/interfaces/global.interfaces";

export class AppointmentsService {
    constructor() {}

    async getForPeriod(query: AppointmentsByPeriod) {
        const {
            startDate,
            endDate,
            type,
        } = query;

        return http.get(`/appointments/period/${type}?startDate=${startDate}&endDate=${endDate}`);
    }

    async getForStaffForWeek(query: AppointmentsByStaffForWeek) {
        const {
            staffId,
            year,
            week,
        } = query;

        return http.get(`/appointments/staff/${staffId}?year=${year}&week=${week}`);
    }

    async create(createAppointmentDto: CreateAppointmentDto) {
        return http.post(`/appointments`, createAppointmentDto);
    }

    async destroy(id: number) {
        return http.delete(`/appointments/${id}`);
    }

    async destroyOwn(userId: number, id: number) {
        return http.delete(`/appointments/user/${userId}/${id}`);
    }

    async getForUser(userId: number, query: IPagination) {
        const {
            page,
            limit,
        } = query;

        return http.get(`/appointments/user/${userId}?page=${page}&limit=${limit}`);
    }
}