import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class UserIsUserGuard implements CanActivate {

    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const { user, params } = context.switchToHttp().getRequest();
        const { userId } = params;

        return user.sub === +userId;
    }
}