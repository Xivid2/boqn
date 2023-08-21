import { IsNotEmpty, IsNumber, IsString, MinLength, MaxLength, Min, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ServiceType } from '../enums/service-type.enum';

export class UpdateServiceDto {
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    staffId: number

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    name: string

    @IsNotEmpty()
    @IsString()
    @IsIn([
        ServiceType.MASSAGE,
        ServiceType.ERGO,
        ServiceType.LOGO
    ])
    type: string

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    goal: string

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    imgSrc: string

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    shortDescription: string

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(5000)
    description: string

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => {
        return Number(value);
    })
    @Min(1)
    duration: number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => {
        return parseFloat(value);
    })
    @Min(1)
    price: number
};