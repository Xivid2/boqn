import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException } from '@nestjs/common';
import { ErgoAppointment } from './models/ergo-appointments.model';
import { Op } from "sequelize";
import { CreateErgoAppointmentDto } from './dto/create-ergo-appointment.dto';
import BDate from '../common/plugins/date.plugin';

const maximumEndDate = new BDate(new BDate().addMonths(1)).getEndOfDay();

@Injectable()
export class ErgoAppointmentsService {
    constructor(
        @InjectModel(ErgoAppointment)
        private ergoAppointment: typeof ErgoAppointment,
    ) {}

    async getForPeriod(startDate: Date, endDate: Date): Promise<any> {
        // this.validateQueryPeriod(startDate, endDate);

        const appointments = await this.ergoAppointment.findAll({
            where: {
                date: {
                    [Op.between]: [
                        new BDate(startDate).getStartOfDay(),
                        new BDate(startDate).getEndOfDay(),
                    ]
                }
            }
        });

        const groupedByDay = {};

        appointments.forEach(app => {
            const date = new BDate(app.date);
            const formatted = date.format();
            const hour = date.getHour();

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
        // const isStartDateAfterToday = dayjs(startDate).isAfter(dayjs().endOf('day'));
        const isStartDateAfterToday = new BDate(startDate).isAfter(new BDate().getEndOfDay());

        if (!isStartDateAfterToday) {
            throw new BadRequestException("startDate must be after today");
        }

        // const isStartDateBeforeEndDate = dayjs(startDate).isBefore(dayjs(endDate));
        const isStartDateBeforeEndDate = new BDate(startDate).isBefore(new Date(endDate));

        if (!isStartDateBeforeEndDate) {
            throw new BadRequestException("startDate must be before endDate");
        }

        // const isEndDateAfterMaximumEndDate = dayjs(endDate).isBefore(maximumEndDate);
        const isEndDateAfterMaximumEndDate = new BDate(endDate).isBefore(maximumEndDate);

        if (!isEndDateAfterMaximumEndDate) {
            throw new BadRequestException(`endDate must be before ${maximumEndDate}`);
        }
    }
}
