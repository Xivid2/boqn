import { IsNotEmpty, IsDateString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ServiceType } from 'src/services/enums/service-type.enum';

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

export class PeriodTypeParam {
    @IsNotEmpty()
    @IsIn([
        ServiceType.MASSAGE,
        ServiceType.ERGO,
        ServiceType.LOGO,
    ])
    type: string
}