import { Module } from '@nestjs/common';
import { ErgoAppointmentsService } from './ergo-appointments.service';
import { ErgoAppointmentsController } from './ergo-appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ErgoAppointment } from './models/ergo-appointments.model';

@Module({
    imports: [SequelizeModule.forFeature([ErgoAppointment])],
    exports: [ErgoAppointmentsService, SequelizeModule],
    providers: [ErgoAppointmentsService],
    controllers: [ErgoAppointmentsController]
})
export class ErgoAppointmentsModule {}
