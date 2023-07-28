import { g_UserRole } from "./users/models/user-roles.model";
import { ErgoAppointment } from "./ergo-appointments/models/ergo-appointments.model";
import { User } from "./users/models/user.model";
import { UserRefreshToken } from "./users/models/user-refresh-token.model";
import { Service } from "./services/service.model";

export default [
    g_UserRole,
    ErgoAppointment,
    Service,
    User,
    UserRefreshToken,
];