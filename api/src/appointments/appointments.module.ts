import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './models/appointments.model';

@Module({
    imports: [SequelizeModule.forFeature([Appointment])],
    exports: [AppointmentsService, SequelizeModule],
    providers: [AppointmentsService],
    controllers: [AppointmentsController]
})
export class AppointmentsModule {}
