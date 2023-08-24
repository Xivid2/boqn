export interface RegistrationDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export interface AuthStoreState {
    loading: boolean;
    error: string;
    accessToken: string;
    role: string;
    isInitialRefreshComplete: boolean;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }
};