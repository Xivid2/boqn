import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Massage } from '../models/massage.model';

@Injectable()
export class MassagesService {
    constructor(
        @InjectModel(Massage)
        private massage: typeof Massage,
    ) {}

    async getAll() {
        return this.massage.findAll();
    }
}
