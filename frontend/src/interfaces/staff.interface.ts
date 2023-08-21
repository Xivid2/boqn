import { type User } from "../services/user.service"; //TODO: FIx

export interface Staff {
    id: number;
    userId: number;
    user: User
};