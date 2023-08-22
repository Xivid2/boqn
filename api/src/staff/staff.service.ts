import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { User } from 'src/users/models/user.model';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Service } from 'src/services/service.model';

@Injectable()
export class StaffService {
    constructor(
        @InjectModel(Staff)
        private staff: typeof Staff,
        @InjectModel(User)
        private user: typeof User,
    ) {}

    async get(id: number): Promise<Staff> {
        const staff = await this.staff.findByPk(id);

        if (!staff) {
            throw new NotFoundException()
        }

        return staff;
    }

    async getAll(): Promise<Staff[]> {
        return this.staff.findAll({
            include: [this.user]
        });
    }

    async getByServiceType(type: string): Promise<Staff> {
        const staff = await this.staff.findOne({
            include: [{
                model: Service,
                where: {
                    type
                }
            }]
        });

        if (!staff) {
            throw new NotFoundException();
        }

        return staff;
    }

    async getByServiceId(id: number) {
        const staff = await this.staff.findOne({
            include: [{
                model: Service,
                where: {
                    id
                }
            }]
        });

        if (!staff) {
            throw new NotFoundException();
        }

        return staff;
    }
}