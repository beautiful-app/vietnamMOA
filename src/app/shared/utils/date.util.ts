export class DateUtil {
    
    private static _date: Date = new Date();
    
    public static getFullYear(): string {
        return '' + this._date.getFullYear();
    }
    
    public static getCuttentMonth() {
        return this._date.getMonth() + 1;
    }
    
    public static getYearMonth(): string {
        return this.getFullYear() + '/' + this.getCuttentMonth();
    }
}
