export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UsersPaginationDto {
    page?: number;
    limit?: number;
};