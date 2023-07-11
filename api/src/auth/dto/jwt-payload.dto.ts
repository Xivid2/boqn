import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDto {
    @IsNotEmpty()
    sub: string

    @IsNotEmpty()
    email: string
};