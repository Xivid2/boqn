import { Controller, Req, Res, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessTokenGuard } from './guards/jwt-auth-access-token.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-auth-refresh-token.guard';
import { AuthService } from './auth.service';
import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() registrationDto: RegistrationDto) {
        return this.authService.register(registrationDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const payload = await this.authService.login(req.user);

        const decoded = decode(payload.refresh_token, { json: true });
        const expires = new Date(decoded.exp * 1000);
 
        response.cookie(
            "jwt",
            payload.refresh_token,
            {
                httpOnly: true,
                secure: true,
                sameSite: true,
                expires,
            }
        );

        return payload;
    }

    @UseGuards(JwtAccessTokenGuard)
    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.logout(req.user['sub']);
        
        response.clearCookie("jwt");

        return;
    }

    @UseGuards(JwtAccessTokenGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Post('refresh')
    async refresh(
        @Req() req,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { sub: id, refreshToken } = req.user;

        const payload = await this.authService.refreshTokens(id, refreshToken);

        const { refresh_token } = payload;

        response.cookie("jwt", refresh_token, { httpOnly: true });

        return payload;
    }
}