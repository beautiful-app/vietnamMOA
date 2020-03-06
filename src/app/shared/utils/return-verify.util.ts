import {APP} from '../../../environments/app.config';

export class RETURN {
    code: string;
    private static a = APP.succeedCode;
    
    static isSucceed(res): boolean {
        return res && res.code === this.a;
    }
    
    static isTrue(res): boolean {
        return res === true;
    }
}
