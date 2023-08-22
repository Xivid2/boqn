import { Module, forwardRef } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { User } from 'src/users/models/user.model';
import { ServicesModule } from 'src/services/services.module';

@Module({
    imports: [
        forwardRef(() => ServicesModule),
        SequelizeModule.forFeature([Staff, User])
    ],
    providers: [StaffService],
    controllers: [StaffController],
    exports: [StaffService, SequelizeModule]
})
export class StaffModule {}
