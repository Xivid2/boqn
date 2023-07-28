import { Controller, UseGuards, Get, Post, Query, Body, ValidationPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/constants/role';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-auth-access-token.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
    constructor(
        private servicesService: ServicesService
    ) {}

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Post('')
    async create(
        @Body(new ValidationPipe({ transform: true })) createServiceDto: CreateServiceDto
        ) {
        console.log('createServiceDto:', createServiceDto)
    }
}
