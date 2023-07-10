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
        const payload = {
            username: user.username,
            sub: user.userId
        };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(
                payload,
                {
                    expiresIn: this.config.get<string>('JWT_REFRESH_TOKEN_LIFE')
                }
            ),
        };
    }

    async refresh(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);

            const { sub, username } = payload;

            return {
                access_token: this.jwtService.sign({ username, sub }),
                refresh_token: this.jwtService.sign(
                    { username, sub },
                    {
                        expiresIn: this.config.get<string>('JWT_REFRESH_TOKEN_LIFE')
                    }
                ),
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async genTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
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
            accessToken,
            refreshToken,
        };
    }
}