import type { User } from './users.interface';

export interface RegistrationDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

export interface AuthStoreState {
    loading: boolean;
    error: string;
    accessToken: string;
    role: string;
    isInitialRefreshComplete: boolean;
    user: User
};