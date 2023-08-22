import { type User } from "./users.interface";

export interface Staff {
    id: number;
    userId: number;
    user: User
};