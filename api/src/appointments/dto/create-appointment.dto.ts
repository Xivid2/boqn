import { IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsDateString()
    date: string

    @IsOptional()
    @IsNumber()
    userId: number
};