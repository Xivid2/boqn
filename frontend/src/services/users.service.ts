import { http } from "@/plugins/newApi";
import { type UsersPaginationDto } from "@/interfaces/users.interface";

export class UsersService {
    constructor() {}

    async getCurrent() {
        return http.get(`/users/current`);
    }

    async getAll(query: UsersPaginationDto) {
        const {
            page = 1,
            limit = 10,
        } = query;

        return http.get(`/users?page=${page}&limit=${limit}`);
    }

    async destroy(id: number) {
        return http.delete(`/users/${id}`);
    }
}