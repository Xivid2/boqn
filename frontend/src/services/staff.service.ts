import { http } from "@/plugins/newApi";
import { type Staff } from "@/interfaces/staff.interface";

export class StaffService {
    constructor() {}

    async getAll() {
        return http.get<Staff[]>(`/staff`);
    }
}