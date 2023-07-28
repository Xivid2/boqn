export interface Massage {
    id: number;
    name: string;
    goal: string;
    imgSrc: string,
    shortDescription: string,
    description: string;
    duration: number;
    price: number;
};

export interface CreateMassageDto {
    name: string;
    goal: string;
    description: string;
    duration: number;
    price: number;
}

export class MassageService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getAll() {
        try {
            const { data } = await this.http.get<Massage[]>(`/massages`);

            return { data };
        } catch (error) {
            return { error };
        }
    }
}