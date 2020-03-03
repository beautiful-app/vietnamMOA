import {MatchFieldBo} from '../entity/match-field.bo';

export class MapperUtil {
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
    
    // 部分改变
    // original: string, replace: string
    static mapPart(operationObj: any = {}, changes: MatchFieldBo[]): any {
        let newObj = {...operationObj};
        changes.forEach(r => {
            newObj[r.replace] = newObj[r.original];
            delete newObj[r.original];
        });
        return newObj;
    }
}

// 改变其中一个
