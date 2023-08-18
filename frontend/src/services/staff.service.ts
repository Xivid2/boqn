import { type User } from "./user.service";

export interface Staff {
    id: number;
    userId: number;
    user: User
};

export class StaffService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getAll() {
        try {
            const { data } = await this.http.get<Staff[]>(`/staff`);

            return { data };
        } catch (error) {
            return { error };
        }
    }
}