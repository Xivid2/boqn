import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        let refreshToken;

        refreshToken = request.cookies['jwt'];

        if (!refreshToken) {
            refreshToken = request.body?.refreshToken;
        }

        request.headers['authorization'] = `Bearer ${refreshToken}`;

        return super.canActivate(context);
    }
}