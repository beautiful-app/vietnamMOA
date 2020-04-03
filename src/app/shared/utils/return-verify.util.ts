import {result} from '../entity/result.bo';
import {APP} from '../../core/singleton.export';

export class RETURN {
    code: string;
    private static succeedCode = APP.succeedCode;
    
    static isSucceed(res): boolean {
        return res && res.code === this.succeedCode;
    }
    
    static next(observable: any, res: result) {
        if(this.isSucceed(res)) observable.next(res);
        else if(!res.hasError) observable.next(0);
        observable.complete();
    }
    
    static nextData(observable: any, res: result) {
        if(this.isSucceed(res) && res.data) observable.next(res.data);
        else if(!res.hasError) observable.next(0);
        observable.complete();
    }
    
    static nextMsg(observable: any, r: result) {
        if(this.isSucceed(r)) observable.next();
        else if(!r.hasError && r.msg) observable.next(r.msg);
        observable.complete();
    }
    
    static isTrue(res): boolean {
        return res === true;
    }
    
    static hasData(r): boolean {
        return r != undefined && r != 0;
    }
    
    static notData(r: any) {
        return r === 0;
    }
    
    static networkError(r: any) {
        return r.hasError == true;
    }
}
