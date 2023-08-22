import { defineStore } from 'pinia';
import { $error, $success } from '@/services/notify.service';
import { AuthService } from '@/services/auth.service';
import { type AuthStoreState, type RegistrationDto } from '@/interfaces/auth.interface';
import * as translations from '@/constants/AuthTranslations';

export const useAuthStore = (options = {}) => {
    const authService = new AuthService();

    return defineStore('auth', {
        state: (): AuthStoreState => ({
            loading: false,
            error: "",
            accessToken: '',
            role: '',
            isInitialRefreshComplete: false,
        }),
        getters: {
            isAuthenticated(): boolean {
                return !!this.accessToken;
            },
            isAdmin(): boolean {
                return this.role === "admin";
            },
        },
        actions: {
            setToken(accessToken: string) {
                this.accessToken = accessToken;
            },
            setRole(role: string) {
                this.role = role;
            },
            setUnauthenticated() {
                this.accessToken = '';
            },
            prepareAction() {
                this.loading = true;
                this.error = '';
            },
            async login(email: string, password: string) {
                this.prepareAction();

                try {
                    const { data } = await authService.login(email, password);

                    const { access_token, role } = data;

                    this.accessToken = access_token;
                    this.role = role;
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAuthCannotLogin;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async register(input: RegistrationDto) {
                this.prepareAction();

                try {
                    await authService.register(input);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAuthCannotRegister;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async logout() {
                this.prepareAction();

                try {
                    await authService.logout();

                    this.setUnauthenticated();
                } catch (error) {
                    const err = error.response?.data?.message || translations.TAuthCannotSignOut;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async refreshTokens() {
                this.prepareAction();

                try {
                    const { data } = await authService.refreshTokens();

                    const { access_token, role } = data;

                    this.accessToken = access_token;
                    this.role = role;

                    if (!this.isInitialRefreshComplete) {
                        this.isInitialRefreshComplete = true;
                    }
                } catch (error) {
                    this.setUnauthenticated();

                    const err = error.response?.data?.message || translations.TAuthCannotRefreshTokens;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
        }
    })()
};