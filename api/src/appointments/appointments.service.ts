import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as dayjs from "dayjs-with-plugins";
import { BadRequestException } from '@nestjs/common';
import { Appointment } from './models/appointments.model';
import { Op } from "sequelize";
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { StaffService } from 'src/staff/staff.service';
import { DuplicatedAppointmentException } from './appointments.errors';
import { User } from 'src/users/models/user.model';
import { Service } from 'src/services/service.model';

const maximumEndDate = dayjs().add(1, 'month').endOf('day');

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment)
        private appointment: typeof Appointment,
        @InjectModel(User)
        private user: typeof User,
        @InjectModel(Service)
        private service: typeof Service,
        private staffService: StaffService,
    ) {}

    async getForStaffForWeek(staffId: number, year: number, week: number) {
        // NB: Dayjs start day is sunday, we have to add 1 day;
        // Locales are currently stupid af
        const startDate = dayjs().year(year).week(week).startOf('week').add(1, 'day');
        const endDate = dayjs().year(year).week(week).endOf('week').add(1, 'day');

        const appointments = await this.appointment.findAll({
            where: {
                staffId,
                date: {
                    [Op.between]: [
                        new Date(dayjs(startDate).startOf('day')),
                        new Date(dayjs(endDate).endOf('day'))
                    ]
                }
            },
            include: [
                { model: this.service },
            ]
        });

        return appointments;
    }

    async getForPeriod(type: string, startDate: Date, endDate: Date): Promise<any> {
        const staff = await this.staffService.getByServiceType(type);

        if (!staff) {
            throw new NotFoundException();
        }

        this.validateQueryPeriod(startDate, endDate);

        const appointments = await this.appointment.findAll({
            where: {
                staffId: staff.id,
                date: {
                    [Op.between]: [
                        new Date(dayjs(startDate).startOf('day')),
                        new Date(dayjs(endDate).endOf('day'))
                    ]
                }
            }
        });

        const groupedByDay = {};

        appointments.forEach(app => {
            const date = dayjs(app.date);
            const formatted = date.format('YYYY-MM-DD');
            const hour = date.hour();

            if (!groupedByDay[formatted]) {
                groupedByDay[formatted] = [];
            }

            groupedByDay[formatted].push(hour);
        })

        return groupedByDay;
    }

    async create(createAppointmentDto: CreateAppointmentDto) {
        const staff = await this.staffService.getByServiceId(createAppointmentDto.serviceId);

        const appointment = await this.getByStaffAndExactDate(staff.id, createAppointmentDto.date);

        if (appointment) {
            throw new DuplicatedAppointmentException();
        }

        return this.appointment.create({
            date: createAppointmentDto.date,
            firstName: createAppointmentDto.firstName,
            lastName: createAppointmentDto.lastName,
            email: createAppointmentDto.email,
            phone: createAppointmentDto.phone,
            staffId: staff.id,
            serviceId: createAppointmentDto.serviceId,
        });
    }

    async getByStaffAndExactDate(staffId: number, date: string) {
        const appointment = await this.appointment.findOne({
            where: {
                staffId,
                date
            }
        });

        return appointment;
    }

    validateQueryPeriod(startDate: Date, endDate: Date) {
        const isStartDateAfterToday = dayjs(startDate).isAfter(dayjs().endOf('day'));

        if (!isStartDateAfterToday) {
            throw new BadRequestException("startDate must be after today");
        }

        const isStartDateBeforeEndDate = dayjs(startDate).isBefore(dayjs(endDate));

        if (!isStartDateBeforeEndDate) {
            throw new BadRequestException("startDate must be before endDate");
        }

        const isEndDateAfterMaximumEndDate = dayjs(endDate).isBefore(maximumEndDate);

        if (!isEndDateAfterMaximumEndDate) {
            throw new BadRequestException(`endDate must be before ${maximumEndDate}`);
        }
    }
}
