export interface containsQuery {
    source: string;
    str: string;
}

export class StringUtil {
    
    // 是否包含某字符
    static isInclude(source: string, str: string): boolean {
        return source.indexOf(str) !== -1;
    }
    
    static isIncludeArr(handleArray: Array<any>) {
        let include = false;
        handleArray.forEach(r => {
            if(this.isInclude(r[0], r[1])) include = true;
        });
        return include;
    }
    
}
