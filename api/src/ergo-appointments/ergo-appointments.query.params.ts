import { IsNotEmpty, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PeriodQueryParams {
    @IsNotEmpty()
    @IsDateString()
    @Transform(({ value }) => new Date(value).toISOString())
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    @Transform(({ value }) => new Date(value).toISOString())
    endDate: Date;
}