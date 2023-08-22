import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateServiceException extends HttpException {
    constructor() {
        super('A service with the same type and name already exists', HttpStatus.CONFLICT);
    }
}