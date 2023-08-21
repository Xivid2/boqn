export interface BaseService {
    staffId: number | string,
    type: string;
    name: string;
    goal: string;
    imgSrc: string,
    shortDescription: string,
    description: string;
    duration: number | string;
    price: number | string;
};

export interface Service extends BaseService {
    id: number;
}

export interface CreateServiceDto extends BaseService {};

export interface UpdateServiceDto extends BaseService {};