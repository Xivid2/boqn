import { Controller, Req, Get, Post, Body, UseGuards, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PeriodQueryParams, PeriodTypeParam } from 'src/appointments/dto/get-all-appointments-query.dto';
import { StaffQueryParams } from './dto/get-all-appointments-for-staff.dto';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-auth-access-token.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private appointmentsService: AppointmentsService
    ) {}

    @Get('/period/:type')
    async getAllForPeriod(
        @Param() params: PeriodTypeParam,
        @Query() query: PeriodQueryParams,
    ) {
        const { type } = params;
        const { startDate, endDate } = query;

        return this.appointmentsService.getForPeriod(type, startDate, endDate);
    }

    @Get('/staff/:id')
    async getAllForStaffForWeek(
        @Param('id', ParseIntPipe) id: number,
        @Query() query: StaffQueryParams,
    ) {
        const staffId = id;
        const { week, year } = query;

        return this.appointmentsService.getForStaffForWeek(staffId, year, week);
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
