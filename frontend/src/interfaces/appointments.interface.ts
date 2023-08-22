import type { ServiceType } from "@/enums/service-type.enum";

export interface CreateAppointmentDto {
    date: Date;
    serviceId: number;
};

export interface AppointmentByPeriod {
    type: keyof ServiceType;
    startDate: Date;
    endDate: Date;
}