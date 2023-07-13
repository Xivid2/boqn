import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { decode } from "jsonwebtoken"
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.model';
import { UserRefreshToken } from '../users/user-refresh-token.model';
import { Sequelize } from 'sequelize-typescript';
import { TokenPayload } from './payloads/token.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private sequelize: Sequelize,
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(UserRefreshToken)
        private userRefreshTokenModel: typeof UserRefreshToken,
        private usersService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmailIncludePassword(email);

        if (!user) return null;

        const isPasswordSame = await user.comparePassword(pass);
        
        if (isPasswordSame) {
            const { password, ...result } = user.dataValues;

            return result;
        }

        return null;
    }

    async login(user: any) {
        const { id, email } = user;

        const tokens = await this.genTokens(id, email);

        const decoded = decode(tokens.refresh_token, { json: true });
        const expiresAt = decoded.exp * 1000;
        const hashed = await this.hashToken(tokens.refresh_token);

        return this.sequelize.transaction(async (transaction): Promise<TokenPayload> => {
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

            return tokens;
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
        return this.sequelize.transaction(async (transaction): Promise<TokenPayload> => {
            const user = await this.userModel.findByPk(userId, {
                include: [this.userRefreshTokenModel],
                transaction,
            });

            if (!user || !user.refreshToken || user.refreshToken.isTokenExpired()) {
                throw new ForbiddenException();
            }

            const isTokenSame = await user.refreshToken.compareToken(refreshToken);
            if (!isTokenSame) {
                throw new ForbiddenException();
            }

            const tokens = await this.genTokens(user.id, user.email);
    
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

            return tokens;
        });
    }

    async genTokens(id: number, email: string): Promise<TokenPayload> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: id,
                    email,
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