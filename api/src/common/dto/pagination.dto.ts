import { IsNotEmpty, Min, Max, IsPositive, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    @IsPositive()
    @IsInt()
    @Min(1)
    page: number

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    @IsPositive()
    @IsInt()
    @Min(10)
    @Max(50)
    limit: number
};