import { http } from "@/plugins/newApi";
import { type AppointmentsByPeriod, type CreateAppointmentDto, type AppointmentsByStaffForWeek } from "@/interfaces/appointments.interface";

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
}