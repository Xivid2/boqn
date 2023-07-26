import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./models/user.model";
import { UsersController } from './users.controller';
import { UserRefreshToken } from './models/user-refresh-token.model';
import { g_UserRole } from './models/user-roles.model';

@Module({
    imports: [SequelizeModule.forFeature([User, UserRefreshToken, g_UserRole])],
    providers: [UsersService],
    exports: [UsersService, SequelizeModule],
    controllers: [UsersController],
})
export class UsersModule {}