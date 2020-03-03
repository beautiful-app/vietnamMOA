export class MatchFieldBo {
    public original: string;
    public replace: string;
    
    constructor() {
    }
    
    public static toMatchFieldArray(matchArray: any[]) {
        let returnObj = [];
        matchArray.forEach(r => {
            returnObj.push({original: r[0], replace: r[1]});
        });
        return returnObj;
    }
}
