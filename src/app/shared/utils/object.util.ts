/**
 * @Description: 对象操作工具类
 */
export class ObjectUtil {
	/**
	 * @Description: 判断一个对象是否为空对象
	 * @param:  {obj} 需要判断的对象
	 * @return: boolean
	 */
	static isNotNull(obj: Object) {
		if (obj == undefined) return false;
		return Object.keys(obj).length != 0;
	}
	
	
}
