export default class MassageService {
    constructor(useHttp) {
        this.http = useHttp();
    }

    async getAll() {
        try {
            const { data } = await this.http.get(`/massages`);

            return { data };
        } catch (error) {
            return { error };
        }
    }
}