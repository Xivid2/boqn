import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UserRefreshToken } from '../users/user-refresh-token.model';
import { g_UserRole } from '../users/user-roles.model';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        SequelizeModule.forFeature([User, UserRefreshToken, g_UserRole]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: config.get<string>('JWT_ACCESS_TOKEN_LIFE')
                }
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
    exports: [AuthService, SequelizeModule],
    controllers: [AuthController],
})
export class AuthModule { }