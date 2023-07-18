import { Controller, Req, Res, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ErgoAppointmentsService } from './ergo-appointments.service';
import { PeriodQueryParams } from './ergo-appointments.query.params';

@Controller('ergo-appointments')
export class ErgoAppointmentsController {
    constructor(
        private ergoAppointmentsService: ErgoAppointmentsService
    ) {}

    @Get('/period')
    async getAll(@Query() query: PeriodQueryParams) {
        const { startDate, endDate } = query;

        return this.ergoAppointmentsService.getForPeriod(startDate, endDate);
    }
}
