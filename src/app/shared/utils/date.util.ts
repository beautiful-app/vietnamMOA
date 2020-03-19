export class DateUtil {
    
    private static _date: Date = new Date();
    
    public static getFullYear(): string {
        return '' + this._date.getFullYear();
    }
    
    public static getCurrentMonth(): string {
        return this._date.getMonth() + 1 >= 10 ? '' + (this._date.getMonth() + 1) : '0' + (this._date.getMonth() + 1);
    }
    
    
    public static getYearMonth(separator: string = '/'): string {
        return this.getFullYear() + separator + this.getCurrentMonth();
    }
}
