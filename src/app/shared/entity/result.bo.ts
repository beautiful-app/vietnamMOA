export class result {
    public id: string;
    public code: string;
    public data: data | any;
}

export class resultObj {
    public id: string;
    public code: string;
    public msg: string;
    public data: any;
}

export class data {
    public id: number;
    public current: number;
    public orders: any[];
    public pages: number;
    public records: any[];
    public searchCount: boolean;
    public size: number;
    public total: number;
}
