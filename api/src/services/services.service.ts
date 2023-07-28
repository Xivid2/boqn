import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service)
        private service: typeof Service,
    ) {}

    async create(createServiceDto: CreateServiceDto) {
        const result = await this.service.create({
            type: createServiceDto.type,
            name: createServiceDto.name,
            goal: createServiceDto.goal,
            imgSrc: createServiceDto.imgSrc,
            shortDescription: createServiceDto.shortDescription,
            description: createServiceDto.description,
            duration: createServiceDto.duration,
            price: createServiceDto.price,
        });

        return result;
    }
}
