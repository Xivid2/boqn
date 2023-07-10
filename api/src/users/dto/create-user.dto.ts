import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    userRoleId: number

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
};