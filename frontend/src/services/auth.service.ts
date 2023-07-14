type RegistrationDto = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
};

export default class AuthService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async register(input: RegistrationDto) {
        try {
            const { data } = await this.http.post('/auth/register', input);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async login(email: string, password: string) {
        try {
            const { data } = await this.http.post('/auth/login', {
                email, password,
            });

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async logout() {
        try {
            const { data } = await this.http.post('/auth/logout');

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async refreshTokens() {
        try {
            const { data } = await this.http.post('/auth/refresh');

            return { data };
        } catch (error) {
            return { error };
        }
    }
}