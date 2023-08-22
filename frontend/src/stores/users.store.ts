import { defineStore } from 'pinia';
import { UsersService } from '@/services/users.service';
import { type User, type UsersPaginationDto } from '@/interfaces/users.interface';
import { $error, $success } from '@/services/notify.service';
import * as translations from '@/constants/UsersTranslations';

interface UsersState {
    loading: boolean;
    error: string;
    pages: number;
    users: User[];
}

export const useUsersStore = (options = {}) => {
    const usersService = new UsersService();

    return defineStore('users', {
        state: (): UsersState => ({
            loading: false,
            error: '',
            pages: 1,
            users: [],
        }),
        actions: {
            prepareAction() {
                this.loading = true;
                this.error = '';
            },
            async getAll(query: UsersPaginationDto) {
                this.users = [];

                try {
                    const { data } = await usersService.getAll(query);

                    this.users = data.users;
                    this.pages = data.pages
                } catch (error) {
                    const err = error.response?.data?.message || translations.TUsersCannotGetAll;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            },
            async destroy(id: number) {
                this.prepareAction();

                try {
                    await usersService.destroy(id);

                    $success(translations.TUsersDeletedSuccessfully);
                } catch (error) {
                    const err = error.response?.data?.message || translations.TUsersCannotDelete;

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            }
        }
    })();
}