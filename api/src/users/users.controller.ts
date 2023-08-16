import { Controller, Get, UseGuards, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-auth-access-token.guard';
import Role from '../common/constants/role';
import Roles from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) {}

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Get('')
    async getAll(
        @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto
    ) {
        return this.userService.getPaginated(pagination);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Delete(':id')
    async destroy(@Param('id') id: number): Promise<any> {
        return this.userService.destroy(id);
    }
}
