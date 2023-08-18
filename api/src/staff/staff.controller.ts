import { Controller, UseGuards, Get } from '@nestjs/common';
import { StaffService } from './staff.service';
import Roles from '../common/decorators/role.decorator';
import Role from '../common/constants/role';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-auth-access-token.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Staff } from './models/staff.model';

@Controller('staff')
export class StaffController {
    constructor(
        private staffService: StaffService
    ) {}

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Get('')
    async getAll(): Promise<Staff[]> {
        return this.staffService.getAll();
    }
}
