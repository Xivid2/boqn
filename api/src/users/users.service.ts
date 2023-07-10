import * as bcrypt from "bcrypt";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from "./dto/create-user.dto";
import { DuplicateUserException } from "./users.errors";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private config: ConfigService,
    ) {}

    async findByEmailIncludePassword(email: string): Promise<User> {
        return this.userModel.scope('withPassword').findOne({
            where: {
                email: email.toLocaleLowerCase(),
            }
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
}