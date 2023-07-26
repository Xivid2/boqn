import { SetMetadata } from "@nestjs/common";
import { Role } from "../constants/role";

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);