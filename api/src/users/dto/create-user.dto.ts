import { IsNotEmpty, IsEmail, Equals, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    userRoleId: number

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    firstName: string

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    lastName: string

    @IsEmail()
    @MaxLength(255)
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password: string
};