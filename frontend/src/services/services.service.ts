export interface Service {
    id: number;
    type: string;
    name: string;
    goal: string;
    imgSrc: string,
    shortDescription: string,
    description: string;
    duration: number;
    price: number;
};

export interface CreateServiceDto {
    type: string;
    name: string;
    goal: string;
    imgSrc: string,
    shortDescription: string,
    description: string;
    duration: number;
    price: number;
}

export interface UpdateServiceDto {
    type: string;
    name: string;
    goal: string;
    imgSrc: string,
    shortDescription: string,
    description: string;
    duration: number;
    price: number;
}

export class ServicesService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async get(id: number) {
        try {
            const { data } = await this.http.get<Service>(`/services/${id}`);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async getAll() {
        try {
            const { data } = await this.http.get<Service[]>(`/services`);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async create(createServiceDto: CreateServiceDto) {
        try {
            const { data } = await this.http.post<Service>('/services', createServiceDto);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async update(id: number, updateServiceDto: UpdateServiceDto) {
        try {
            const { data } = await this.http.put<Service>(`/services/${id}`, updateServiceDto);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async destroy(id: number) {
        try {
            const { data } = await this.http.delete(`/services/${id}`);

            return { data };
        } catch (error) {
            return { error };
        }
    }
}