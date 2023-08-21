import { http } from "@/plugins/newApi";
import { type Service, type CreateServiceDto, type UpdateServiceDto } from "@/interfaces/services.interface";

export class ServicesService {
    constructor() {}

    async get(id: number) {
        return http.get<Service>(`/services/${id}`);
    }

    async getAll() {
        return http.get<Service[]>(`/services`);
    }

    async create(createServiceDto: CreateServiceDto) {
        return http.post<Service>('/services', createServiceDto);
    }

    async update(id: number, updateServiceDto: UpdateServiceDto) {
        return http.put<Service>(`/services/${id}`, updateServiceDto);
    }

    async destroy(id: number) {
        return http.delete(`/services/${id}`);
    }
}