import type { ServiceType } from "@/enums/service-type.enum";
import type { Service } from "./services.interface";

export interface Appointment {
    staffId: number;
    service: Service;
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
}

export interface CreateAppointmentDto {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    date: Date | string;
    serviceId: number | string;
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