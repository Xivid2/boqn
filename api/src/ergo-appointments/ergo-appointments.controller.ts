import { Controller, Req, Res, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ErgoAppointmentsService } from './ergo-appointments.service';
import { PeriodQueryParams } from './ergo-appointments.query.params';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-auth-access-token.guard';
import { CreateErgoAppointmentDto } from './dto/create-ergo-appointment.dto';

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

    @UseGuards(JwtAccessTokenGuard)
    @Post('')
    async create(
        @Req() req,
        @Body() createErgoAppointmentDto: CreateErgoAppointmentDto,
    ) {
        const { sub: userId } = req.user;

        return this.ergoAppointmentsService.create({
            ...createErgoAppointmentDto,
            userId,
        })
    }
}
