import { UserRole } from "./users/models/user-roles.model";
import { Appointment } from "./appointments/models/appointments.model";
import { User } from "./users/models/user.model";
import { UserRefreshToken } from "./users/models/user-refresh-token.model";
import { Service } from "./services/service.model";
import { Staff } from "./staff/models/staff.model";

export default [
    Appointment,
    Service,
    Staff,
    User,
    UserRole,
    UserRefreshToken,
];