export class EntityUtil {
    // 全部改变
    static mapAll(operationObj: any = {}, ...params): any {
        if(Object.getOwnPropertyNames(operationObj).length != params.length) throw new Error('参数个数不全');
        let i = 0, newObj = {};
        for (let value in operationObj) {
            newObj[params[i]] = operationObj[value];
            i += 1;
            console.log(value);
        }
        console.log(newObj);
        return newObj;
        
    }
    
    static fieldReplacement(operationObj: any = {}, matchArray: any[]) {
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

// 改变其中一个
