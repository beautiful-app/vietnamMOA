import {result} from '../entity/result.bo';
import {APP} from '../../core/singleton.export';

export class RETURN {
    code: string;
    private static a = APP.succeedCode;
    
    static isSucceed(res): boolean {
        return res && res.code === this.a;
    }
    
    static next(res: result, observable: any) {
        if(this.isSucceed(res)) observable.next(res);
        else observable.next();
    }
    
    static nextData(res: result, observable: any) {
        if(this.isSucceed(res)) observable.next(res.data);
        else observable.next();
    }
    
    static isTrue(res): boolean {
        return res === true;
    }
}
