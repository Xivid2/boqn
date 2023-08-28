import { Controller, Req, Get, Post, Body, Delete, UseGuards, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PeriodQueryParams, PeriodTypeParam } from 'src/appointments/dto/get-all-appointments-query.dto';
import { StaffQueryParams } from './dto/get-all-appointments-for-staff.dto';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-auth-access-token.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import Roles from "./../common/decorators/role.decorator";
import Role from 'src/common/constants/role';
import { RolesGuard } from 'src/common/guards/role.guard';

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
        @Body() createAppointmentDto: CreateAppointmentDto,
    ) {
        return this.appointmentsService.create(createAppointmentDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Delete(':id')
    async destroy(
        @Param('id') id: number
    ): Promise<void> {
        return this.appointmentsService.destroy(id);
    }
}
