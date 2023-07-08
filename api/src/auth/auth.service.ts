import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
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
            refresh_token: this.jwtService.sign(payload, { expiresIn: jwtConstants.refreshTokenLife }),
        };
    }

    async refresh(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);

            const { sub, username } = payload;

            return {
                access_token: this.jwtService.sign({ username, sub }),
                refresh_token: this.jwtService.sign({ username, sub }, { expiresIn: jwtConstants.refreshTokenLife }),
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}