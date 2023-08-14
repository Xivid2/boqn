import { SetMetadata } from "@nestjs/common";
import Role from "../constants/role";

const Roles = (...roles: Role[]) => SetMetadata("roles", roles);

export default Roles;