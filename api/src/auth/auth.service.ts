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

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmailIncludePassword(email);

        if (!user) return null;

        const isPasswordSame = await user.comparePassword(pass);
        
        if (isPasswordSame) {
            const result = { ...user.dataValues };

            delete result.password;

            return result;
        }

        return null;
    }

    async login(user: any) {
        const { id, email } = user;

        return this.genTokens(id, email);
    }

    async logout(id: string | number) {
        console.log('da', id);
    }

    async refreshTokens(id: number, refreshToken: string) {
        const user = await this.usersService.findById(id);

        // if (!user || !user.refreshToken)
        //     throw new ForbiddenException('Access Denied');
        // const refreshTokenMatches = await argon2.verify(
        //     user.refreshToken,
        //     refreshToken,
        // );
        // if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.genTokens(user.id, user.email);
        // await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async genTokens(id: number, email: string) {
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
}