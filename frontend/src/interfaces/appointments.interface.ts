import type { ServiceType } from "@/enums/service-type.enum";

export interface CreateAppointmentDto {
    date: Date;
    serviceId: number;
};

export interface AppointmentsByPeriod {
    type: keyof ServiceType;
    startDate: Date;
    endDate: Date;
}

export interface AppointmentsByStaffForWeek {
    staffId: number;
    year: number;
    week: number;
}