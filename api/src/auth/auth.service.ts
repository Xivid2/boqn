import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: any) {
        const { userId, username } = user;

        return this.genTokens(userId, username);
    }

    async logout(userId: string | number) {
        console.log('da', userId);
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findById(userId);

        // if (!user || !user.refreshToken)
        //     throw new ForbiddenException('Access Denied');
        // const refreshTokenMatches = await argon2.verify(
        //     user.refreshToken,
        //     refreshToken,
        // );
        // if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.genTokens(user.userId, user.username);
        // await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async genTokens(userId: number, username: string) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn: this.config.get<string>('JWT_ACCESS_TOKEN_LIFE'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
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
}