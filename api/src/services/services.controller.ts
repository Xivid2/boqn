import { Controller, UseGuards, Get, Post, Query, Body, ValidationPipe, Param, Delete, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import Roles from 'src/common/decorators/role.decorator';
import Role from 'src/common/constants/role';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-auth-access-token.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { QueryServicesDto } from './dto/query-services-dto';
import { Service } from './service.model';

@Controller('services')
export class ServicesController {
    constructor(
        private servicesService: ServicesService
    ) {}

    @Get(':id')
    async get(
        @Param('id') id: number
    ): Promise<Service> {
        return this.servicesService.get(id);
    }

    @Get('')
    async getAll(
        @Query(new ValidationPipe({ transform: true })) queryServicesDto: QueryServicesDto
    ): Promise<Service[]> {
        return this.servicesService.getAll(queryServicesDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Post('')
    async create(
        @Body(new ValidationPipe({ transform: true })) createServiceDto: CreateServiceDto
    ): Promise<Service> {
        return this.servicesService.create(createServiceDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body(new ValidationPipe({ transform: true })) updateServiceDto: UpdateServiceDto
    ): Promise<Service> {
        return this.servicesService.update(id, updateServiceDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Delete(':id')
    async destroy(
        @Param('id') id: number
    ): Promise<void> {
        return this.servicesService.destroy(id);
    }
}
