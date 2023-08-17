import { Controller, Req, Res, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PeriodQueryParams } from '../ergo-appointments/appointments.query.params';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-auth-access-token.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private appointmentsService: AppointmentsService
    ) {}

    @Get('/period')
    async getAll(@Query() query: PeriodQueryParams) {
        const { startDate, endDate } = query;

        return this.appointmentsService.getForPeriod(startDate, endDate);
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
