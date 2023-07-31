import { IsString, IsIn,  IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ServiceType } from '../enums/service-type.enum';

export class QueryServicesDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        return value.toUpperCase();
    })
    @IsIn([
        ServiceType.MASSAGE,
        ServiceType.ERGO,
        ServiceType.LOGO
    ])
    type: string
};