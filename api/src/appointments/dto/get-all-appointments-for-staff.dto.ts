import { IsNotEmpty, IsDateString, IsIn, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class StaffQueryParams {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    week: number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    year: number
};