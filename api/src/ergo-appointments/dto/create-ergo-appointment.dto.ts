import { IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateErgoAppointmentDto {
    @IsNotEmpty()
    @IsDateString()
    date: string

    @IsOptional()
    @IsNumber()
    userId: number
};