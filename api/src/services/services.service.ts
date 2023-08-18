import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import { StaffService } from 'src/staff/staff.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { QueryServicesDto } from './dto/query-services-dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DuplicateServiceException } from './services.errors';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service)
        private service: typeof Service,
        private staffService: StaffService,
    ) {}

    async get(id: number): Promise<Service> {
        const service = await this.service.findByPk(id);

        if (!service) {
            throw new NotFoundException();
        }

        return service;
    }

    async getAll(queryServicesDto: QueryServicesDto): Promise<Service[]> {
        const where = { type: queryServicesDto.type };

        if (!queryServicesDto.type) delete where.type;

        return this.service.findAll({ where });
    }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        const staff = await this.staffService.get(createServiceDto.staffId);

        const sameService = await this.service.findOne({
            where: {
                type: createServiceDto.type,
                name: createServiceDto.name,
            },
        });

        if (sameService) {
            throw new DuplicateServiceException();
        }

        return this.service.create({
            ...createServiceDto,
            staffId: staff.id,
        });
    }

    async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
        const service = await this.service.findByPk(id);

        if (!service) {
            throw new NotFoundException();
        }

        service.set(updateServiceDto);

        await service.save();

        return service;
    }

    async destroy(id: number): Promise<void> {
        const service = await this.service.findByPk(id);

        if (!service) {
            throw new NotFoundException();
        }

        await service.destroy();
    }
}
