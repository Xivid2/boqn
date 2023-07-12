export default class AuthService {
    constructor(useHttp) {
        this.http = useHttp();
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