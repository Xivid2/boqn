import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { QueryServicesDto } from './dto/query-services-dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service)
        private service: typeof Service,
    ) {}

    async getAll(queryServicesDto: QueryServicesDto): Promise<Service[]> {
        const where = { type: queryServicesDto.type };

        if (!queryServicesDto.type) delete where.type;

        return this.service.findAll({ where });
    }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        return this.service.create({ ...createServiceDto });
    }

    async destroy(id: number): Promise<void> {
        const service = await this.service.findByPk(id);

        if (!service) {
            throw new NotFoundException();
        }

        await service.destroy();
    }
}
