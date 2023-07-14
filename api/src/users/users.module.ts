import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./user.model";
import { UsersController } from './users.controller';
import { UserRefreshToken } from './user-refresh-token.model';

@Module({
    imports: [SequelizeModule.forFeature([User, UserRefreshToken])],
    providers: [UsersService],
    exports: [UsersService, SequelizeModule],
    controllers: [UsersController],
})
export class UsersModule {}