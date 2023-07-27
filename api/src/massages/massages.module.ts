import { Module } from '@nestjs/common';
import { MassagesController } from './controllers/massages.controller';
import { MassagesService } from './services/massages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Massage } from './models/massage.model';

@Module({
    imports: [SequelizeModule.forFeature([Massage])],
    controllers: [MassagesController],
    providers: [MassagesService],
    exports: [MassagesService, SequelizeModule]
})
export class MassagesModule {}
