import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUserException extends HttpException {
    constructor() {
        super('A user with the same email already exists.', HttpStatus.CONFLICT);
    }
}