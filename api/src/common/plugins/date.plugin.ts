export default class BDate {
    private date: Date;

    constructor(date?: any) {
        this.date = date ? new Date(date) : new Date();
    }

    get() {
        return this.date;
    }

    getHour() {
        return this.date.getHours();
    }

    format() {
        let month = '' + (this.date.getMonth() + 1);
        let day = '' + this.date.getDate();
        const year = this.date.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    isAfter(date: Date) {
        return this.date.getTime() > new Date(date).getTime();
    }

    isBefore(date: Date) {
        return this.date.getTime() < new Date(date).getTime();
    }

    addMonths(number: number) {
        const date = new Date(this.date);
        date.setMonth(date.getMonth() + number);
        return new Date(date);
    }

    getStartOfDay() {
        return new Date(new Date(this.date).setUTCHours(0, 0, 0, 0));
    }

    getEndOfDay() {
        return new Date(new Date(this.date).setUTCHours(23, 59, 59, 999));
    }
}