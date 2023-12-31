import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { StaffModule } from './staff/staff.module';
import models from "./models";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                dialect: 'postgres',
                host: config.get<string>('POSTGRES_HOST'),
                port: +config.get<number>('POSTGRES_PORT'),
                username: config.get<string>('POSTGRES_USER'),
                password: config.get<string>('POSTGRES_PASSWORD'),
                database: config.get<string>('POSTGRES_DB'),
                models: models,
                logging: false,
            }),
            inject: [ConfigService],
        }),
        AppointmentsModule,
        ServicesModule,
        StaffModule,
    ],
})
export class AppModule {}