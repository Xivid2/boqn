import { Controller, Req, Res, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @Post('refresh')
    async refresh(
        @Res({ passthrough: true }) response: Response,
        @Body() refreshTokenDto: RefreshTokenDto
    ) {
        const payload = await this.authService.refresh(refreshTokenDto.refreshToken);

        const { refresh_token } = payload;

        response.cookie("jwt", refresh_token, { httpOnly: true });

        return payload;
    }
}