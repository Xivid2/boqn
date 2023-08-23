import { Controller, Req, Get, Post, Body, UseGuards, Query, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PeriodQueryParams, PeriodTypeParam } from 'src/appointments/dto/get-all-appointments-query.dto';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-auth-access-token.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private appointmentsService: AppointmentsService
    ) {}

    @Get('/period/:type')
    async getAll(
        @Param() params: PeriodTypeParam,
        @Query() query: PeriodQueryParams,
    ) {
        const { type } = params;
        const { startDate, endDate } = query;

        return this.appointmentsService.getForPeriod(type, startDate, endDate);
    }

    @UseGuards(JwtAccessTokenGuard)
    @Post('')
    async create(
        @Req() req,
        @Body() createAppointmentDto: CreateAppointmentDto,
    ) {
        const { sub: userId } = req.user;

        return this.appointmentsService.create({
            ...createAppointmentDto,
            userId,
        })
    }
}
