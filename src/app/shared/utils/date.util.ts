/**
 * @Description: 日期操作相关工具类
 */
export class DateUtil {
	
	private static _date: Date = new Date();
	
	/**
	 * @Description: 获取当前年份
	 */
	public static getFullYear(): string {
		return '' + this._date.getFullYear();
	}
	
	/**
	 * @Description: 获取当前月份
	 */
	public static getCurrentMonth(): string {
		return this._date.getMonth() + 1 >= 10 ? '' + (this._date.getMonth() + 1) : '0' + (this._date.getMonth() + 1);
	}
	
	/**
	 * @Description: 以制定分隔符返回 年{分隔符}月
	 */
	public static getYearMonth(separator: string = '/'): string {
		return this.getFullYear() + separator + this.getCurrentMonth();
	}
}
