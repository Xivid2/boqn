export default class AppointmentService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getForPeriod(startDate: Date, endDate: Date) {
        try {
            const { data } = await this.http.get(`/appointments/period?startDate=${startDate}&endDate=${endDate}`);

            return { data };
        } catch (error) {
            return { error };
        }
    }

    async create(date: Date) {
        try {
            const { data } = await this.http.post(`/appointments`, { date });

            return { data };
        } catch (error) {
            return { error };
        }
    }
}