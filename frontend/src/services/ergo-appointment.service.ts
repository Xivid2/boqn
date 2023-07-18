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

    async create(date: Date) {
        try {
            const { data } = await this.http.post(`/ergo-appointments`, { date });

            return { data };
        } catch (error) {
            return { error };
        }
    }
}