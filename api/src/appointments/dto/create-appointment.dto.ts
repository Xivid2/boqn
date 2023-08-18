import { IsNotEmpty, IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsDateString()
    date: string

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    @IsPositive()
    @IsNumber()
    serviceId: number

    @IsOptional()
    @IsNumber()
    userId: number
};