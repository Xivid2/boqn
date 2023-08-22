import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedAppointmentException extends HttpException {
    constructor() {
        super('There is already an appointment for this staff member for that hour', HttpStatus.CONFLICT);
    }
}