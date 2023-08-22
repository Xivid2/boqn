import { http } from "@/plugins/newApi";
import { type AppointmentByPeriod, type CreateAppointmentDto } from "@/interfaces/appointments.interface";

export class AppointmentsService {
    constructor() {}

    async getForPeriod(query: AppointmentByPeriod) {
        const {
            startDate,
            endDate,
            type,
        } = query;

        return http.get(`/appointments/period/${type}?startDate=${startDate}&endDate=${endDate}`);
    }

    async create(createAppointmentDto: CreateAppointmentDto) {
        return http.post(`/appointments`, createAppointmentDto);
    }
}