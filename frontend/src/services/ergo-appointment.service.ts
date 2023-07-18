type AppointmentDto = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
};

export default class AppointmentService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getForPeriod(startDate: Date, endDate: Date) {
        try {
            const { data } = await this.http.get(`/ergo-appointments/period?startDate=${startDate}&endDate=${endDate}`);

            return { data };
        } catch (error) {
            return { error };
        }
    }
}