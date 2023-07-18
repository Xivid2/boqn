import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as dayjs from "dayjs-with-plugins";
import { BadRequestException } from '@nestjs/common';
import { ErgoAppointment } from './models/ergo-appointments.model';
import { Op } from "sequelize";
import { CreateErgoAppointmentDto } from './dto/create-ergo-appointment.dto';

const maximumEndDate = dayjs().add(1, 'month').endOf('day');

@Injectable()
export class ErgoAppointmentsService {
    constructor(
        @InjectModel(ErgoAppointment)
        private ergoAppointment: typeof ErgoAppointment,
    ) {}

    async getForPeriod(startDate: Date, endDate: Date): Promise<any> {
        this.validateQueryPeriod(startDate, endDate);

        const appointments = await this.ergoAppointment.findAll({
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

    async create(createErgoAppointmentDto: CreateErgoAppointmentDto) {
        return this.ergoAppointment.create({
            date: createErgoAppointmentDto.date,
            userId: createErgoAppointmentDto.userId
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
