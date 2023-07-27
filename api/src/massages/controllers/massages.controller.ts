import { Controller, Get } from '@nestjs/common';
import { MassagesService } from '../services/massages.service';

@Controller('massages')
export class MassagesController {
    constructor(
        private massagesService: MassagesService
    ) {}

    @Get('')
    async getAll() {
        return this.massagesService.getAll();
    }
}
