import { createParamDecorator } from "@nestjs/common";
import { User } from "src/users/models/user.model";

export const GetUser = createParamDecorator((data, host): User => {
    const req = host.getArgByIndex(0);

    return req.user;
});