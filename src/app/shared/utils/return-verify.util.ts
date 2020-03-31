import {result} from '../entity/result.bo';
import {APP} from '../../core/singleton.export';

export class RETURN {
    code: string;
    private static succeedCode = APP.succeedCode;
    
    static isSucceed(res): boolean {
        return res && res.code === this.succeedCode;
    }
    
    static next(res: result, observable: any) {
        if(this.isSucceed(res)) observable.next(res);
        else if(res.hasError) observable.next();
        else observable.next(0);
    }
    
    static nextData(observable: any, res: result) {
        if(this.isSucceed(res) && res.data) observable.next(res.data);
        else if(!res.hasError) observable.next(0);
        observable.complete();
    }
    
    static isTrue(res): boolean {
        return res === true;
    }
    
    static hasData(res): boolean {
        return res != undefined && res != 0;
    }
    
    static notData(res: any) {
        return res === 0;
    }
}
