export class DateUtil {
    
    private static _date: Date = new Date();
    
    public static getFullYear(): string {
        return '' + this._date.getFullYear();
    }
    
    public static getCuttentMonth() {
        return this._date.getMonth() + 1;
    }
    
    
    public static getYearMonth(separator: string = '/'): string {
        return this.getFullYear() + separator + this.getCuttentMonth();
    }
}
