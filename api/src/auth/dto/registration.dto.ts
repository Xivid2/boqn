import { IsNotEmpty, IsEmail, Equals, MinLength, MaxLength } from 'class-validator';
import { Match } from '../validators/match.decorator';
import { EmailNotRegistered } from '../validators/unique-email.decorator';

export class RegistrationDto {
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
    @EmailNotRegistered({ message: 'User with same email already exists' })
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    @Match('password', { message: 'Passwords missmatch' })
    confirmPassword: string
};