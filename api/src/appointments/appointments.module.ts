import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './models/appointments.model';
import { ServicesModule } from './../services/services.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
    imports: [StaffModule, ServicesModule, SequelizeModule.forFeature([Appointment])],
    exports: [AppointmentsService, SequelizeModule],
    providers: [AppointmentsService],
    controllers: [AppointmentsController]
})
export class AppointmentsModule {}
