import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserRole } from "./models/user-roles.model";
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from "./dto/create-user.dto";
import { DuplicateUserException } from "./users.errors";
import Role from "../common/constants/role";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(UserRole)
        private userRole: typeof UserRole,
        private config: ConfigService,
    ) {}

    async getUserForAuth(email: string): Promise<User> {
        return this.userModel.scope('withPassword').findOne({
            where: {
                email: email.toLocaleLowerCase(),
            },
            include: [this.userRole]
        })
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                email: email.toLocaleLowerCase()
            },
        })
    }

    async findById(id: number): Promise<User> {
        return this.userModel.findByPk(id);
    }

    async create(createUserDto: CreateUserDto) {
        const userWithSameEmail = await this.findByEmail(createUserDto.email);

        if (userWithSameEmail) {
            throw new DuplicateUserException();
        }

        const encryptedPassword = await bcrypt.hash(
            createUserDto.password,
            +this.config.get<number>("AUTH_SALT_ROUNDS"),
        );

        const input = {
            ...createUserDto,
            password: encryptedPassword,
        };

        return this.userModel.create(input);
    }

    async getPaginated(query) {
        const { limit, page } = query;
        const offset = (page - 1) * limit;

        const queryOptions = {
            limit,
            offset,
            include: [{
                model: this.userRole,
                where: {
                    name: Role.CUSTOMER,
                },
            }],
        }

        const { count, rows } = await this.userModel.findAndCountAll(queryOptions);

        return {
            totalCount: count,
            pages: Math.ceil(count / limit),
            users: rows,
        };
    }

    async destroy(id: number) {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            throw new BadRequestException();
        }

        return user.destroy();
    }
}