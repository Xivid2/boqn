import { Controller, Req, Res, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ErgoAppointmentsService } from './ergo-appointments.service';

@Controller('ergo-appointments')
export class ErgoAppointmentsController {
    constructor(
        private ergoAppointmentsService: ErgoAppointmentsService
    ) {}

    @Get('/period')
    async getAll(@Query() query) {
        console.log('query:', query)
        return true
    }
}
