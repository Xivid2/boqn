export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

type PaginationDto = {
    page: number,
    limit: number,
};

export default class UserService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getAll(query: PaginationDto) {
        const {
            page,
            limit,
        } = query;

        try {
            const { data } = await this.http.get(`/users?page=${page}&limit=${limit}`);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async destroy(id: number) {
        try {
            const { data } = await this.http.delete(`/users/${id}`);

            return { data };
        } catch (error) {
            return { error };
        }
    }
}