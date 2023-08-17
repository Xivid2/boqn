import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as dayjs from "dayjs-with-plugins";
import { BadRequestException } from '@nestjs/common';
import { Appointment } from './models/appointments.model';
import { Op } from "sequelize";
import { CreateAppointmentDto } from './dto/create-appointment.dto';

const maximumEndDate = dayjs().add(1, 'month').endOf('day');

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment)
        private appointment: typeof Appointment,
    ) {}

    async getForPeriod(startDate: Date, endDate: Date): Promise<any> {
        this.validateQueryPeriod(startDate, endDate);

        const appointments = await this.appointment.findAll({
            where: {
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
        return this.appointment.create({
            date: createAppointmentDto.date,
            userId: createAppointmentDto.userId
        });
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
