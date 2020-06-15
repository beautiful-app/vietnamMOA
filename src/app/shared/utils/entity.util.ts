/**
 * @Description: 实体类操作工具类
 */
export class EntityUtil {
	/**
	 * @Description: 把对象中名称在数组中匹配的值进行替换,常用于与服务端做交互时临时改变对象的参数名称
	 * @param:  {operationObj} 需要进行替换的对象
	 * @param: {matchArray} [aa,bb] 把{operationObj}中的aa名称的参数替换为bb
	 * @return: Object
	 */
	static fieldReplacement(operationObj: any = {}, matchArray: any[]): Object {
		let returnObj = [];
		matchArray.forEach(r => {
			returnObj.push({original: r[0], replace: r[1]});
		});
		
		let newObj = {...operationObj};
		returnObj.forEach(r => {
			newObj[r.replace] = newObj[r.original];
			delete newObj[r.original];
		});
		return newObj;
	}
}

