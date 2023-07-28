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

export class ServicesService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getAll() {
        try {
            const { data } = await this.http.get<Service[]>(`/massages`);

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
}