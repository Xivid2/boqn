import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { decode } from "jsonwebtoken"
import { ConfigService } from '@nestjs/config';
import { User } from '../users/models/user.model';
import { UserRefreshToken } from '../users/models/user-refresh-token.model';
import { UserRole } from '../users/models/user-roles.model';
import { Sequelize } from 'sequelize-typescript';
import { TokenPayload } from './payloads/token.payload';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/registration.dto';
import Role from '../common/constants/role';

@Injectable()
export class AuthService {
    constructor(
        private sequelize: Sequelize,
        @InjectModel(UserRole)
        private userRole: typeof UserRole,
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(UserRefreshToken)
        private userRefreshTokenModel: typeof UserRefreshToken,
        private usersService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getUserForAuth(email);

        if (!user) return null;

        const isPasswordSame = await user.comparePassword(pass);
        
        if (isPasswordSame) {
            const { password, ...result } = user.dataValues;

            return result;
        }

        return null;
    }

    async register(input: RegistrationDto) {
        const role = await this.userRole.findOne({
            where: {
                name: Role.CUSTOMER,
            },
        });

        const payload = await this.usersService.create({
            ...input,
            userRoleId: role.id
        });

        const { password, ...result } = payload.dataValues;

        return result;
    }

    async login(user: any) {
        const { id, email, role } = user;

        const tokens = await this.genTokens(id, email, role.name);

        const decoded = decode(tokens.refresh_token, { json: true });
        const expiresAt = decoded.exp * 1000;
        const hashed = await this.hashToken(tokens.refresh_token);

        return this.sequelize.transaction(async (transaction): Promise<any> => {
            await this.userRefreshTokenModel.destroy({
                where: {
                    userId: id
                },
                transaction
            });

            
            await this.userRefreshTokenModel.create({
                userId: id,
                token: hashed,
                expiresAt,
            }, { transaction });

            return {
                ...tokens,
                role: role.name,
            };
        });
    }

    async logout(userId: number) {
        return this.userRefreshTokenModel.destroy({
            where: {
                userId
            },
        });
    }

    async refreshTokens(userId: number, refreshToken: string) {
        return this.sequelize.transaction(async (transaction): Promise<any> => {
            const user = await this.userModel.findByPk(userId, {
                include: [this.userRefreshTokenModel, this.userRole],
                transaction,
            });

            if (!user || !user.refreshToken || user.refreshToken.isTokenExpired()) {
                throw new ForbiddenException();
            }

            const isTokenSame = await user.refreshToken.compareToken(refreshToken);
            if (!isTokenSame) {
                throw new ForbiddenException();
            }

            const tokens = await this.genTokens(user.id, user.email, user.role.name);
    
            const decoded = decode(tokens.refresh_token, { json: true });
            const expiresAt = decoded.exp * 1000;
            const hashed = await this.hashToken(tokens.refresh_token);

            await this.userRefreshTokenModel.destroy({
                where: { userId },
                transaction
            });

            await this.userRefreshTokenModel.create({
                userId,
                token: hashed,
                expiresAt,
            }, { transaction });

            return {
                ...tokens,
                role: user.role.name,
            };
        });
    }

    async genTokens(id: number, email: string, roleName: string): Promise<TokenPayload> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: id,
                    email,
                    role: roleName,
                },
                {
                    secret: this.config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn: this.config.get<string>('JWT_ACCESS_TOKEN_LIFE'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: id,
                    email,
                    role: roleName,
                },
                {
                    secret: this.config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: this.config.get<string>('JWT_REFRESH_TOKEN_LIFE'),
                },
            ),
        ]);

        return {
            access_token,
            refresh_token,
        };
    }

    async hashToken(token: string): Promise<string> {
        return bcrypt.hash(
            token,
            +this.config.get<number>("AUTH_SALT_ROUND"),
        );
    }
}