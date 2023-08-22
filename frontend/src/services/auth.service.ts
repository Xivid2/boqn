import { http } from "@/plugins/newApi";
import { type RegistrationDto } from "@/interfaces/auth.interface";
export class AuthService {
    constructor() {}

    async register(input: RegistrationDto) {
        return http.post('/auth/register', input);
    }

    async login(email: string, password: string) {
        return http.post('/auth/login', { email, password });
    }

    async logout() {
        return http.post('/auth/logout');
    }

    async refreshTokens() {
        return http.post('/auth/refresh');
    }
}