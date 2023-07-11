import { Controller, Req, Res, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessTokenGuard } from './guards/jwt-auth-access-token.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-auth-refresh-token.guard';
import { AuthService } from './auth.service';
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req,
        @Res({ passthrough: true }) response: Response,
    ) {
        const payload = await this.authService.login(req.user);

        response.cookie("jwt", payload.refresh_token, { httpOnly: true });

        return payload;
    }

    @UseGuards(JwtAccessTokenGuard)
    @Post('logout')
    async logout(@Req() req) {
        return this.authService.logout(req.user['sub']);
    }

    @UseGuards(JwtAccessTokenGuard)
    @Get('profile')
    getProfile(@Req() req) {
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