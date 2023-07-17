import { Module } from '@nestjs/common';
import { ErgoAppointmentsService } from './ergo-appointments.service';
import { ErgoAppointmentsController } from './ergo-appointments.controller';

@Module({
  providers: [ErgoAppointmentsService],
  controllers: [ErgoAppointmentsController]
})
export class ErgoAppointmentsModule {}
