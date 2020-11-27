import {DateUtil} from '../utils/date.util';

/**
 *  薪资实体
 */
class salaryItem {
    id: string;
    identify?: string;            // 中文标识
    matchField: string;	          // 用于匹配后端接口对应字段
    amount?: string;              // 合计时间/次数
    amountType?: string;          // 类型：时间/次数
    income: string;               // 收入
    items?: salaryItem[] | null;  // 薪资查询数据
    itemsElse?: salaryItem[];     // 其他
}

export class Incomes extends salaryItem {
    items: salaryItem[] | null;
}

export class Salary {
    totalIncoming: string;  // 总收入
    currencySymbol: string; // 货币符号
    hasTranslated: boolean; // 是否已经过翻译
    date: string;           // 日期
    incomes: Incomes[];     // 收入项
}

export const ShowModeA: Salary = {
    totalIncoming: '0,00',
    currencySymbol: '₫',
    hasTranslated: false,
    date: DateUtil.getYearMonth(),
    incomes: [
        {
            id: 'Lang_23',
            identify: "工资",
            matchField: 'totalBaseSalary',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: [
                {
                    id: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_214',
                            identify: "100%的底薪",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_215',
                            identify: "130%的底薪",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        }
                    ]
                },
                {
                    id: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_214',
                            identify: "100%的底薪",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_215',
                            identify: "130%的底薪",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            id: 'Lang_24',
            identify: "加班费",
            matchField: 'totalPositionAllowance',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: [
                {
                    id: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_216',
                            identify: "加班150%时数",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_217',
                            identify: "加班200%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_218',
                            identify: "加班215%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_219',
                            identify: "加班280%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_220',
                            identify: "加班300%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_221',
                            identify: "加班410%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        }
                    ]
                },
                {
                    id: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_216',
                            identify: "加班150%时数",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_217',
                            identify: "加班200%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_218',
                            identify: "加班215%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_219',
                            identify: "加班280%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_220',
                            identify: "加班300%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_221',
                            identify: "加班410%时数",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'H',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            id: 'Lang_25',
            identify: "待工时数",
            matchField: 'totalOvertimeSalary',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: [
                {
                    id: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                },
                {
                    id: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                }
            ]
        },
        {
            id: 'Lang_26',
            identify: "有薪假",
            matchField: 'totalOvertimeAllowance',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: [
                {
                    id: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                },
                {
                    id: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    amount: '0',
                    amountType: 'H',
                    income: '0.00',
                }
            ]
        },
        {
            id: 'Lang_27',
            identify: "加班补助次数",
            matchField: 'totalAllowance',
            amount: '0',
            amountType: 'X',
            income: '0.00',
            items: [
                {
                    id: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    amountType: 'X',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_227',
                            identify: "加班补助次数150%",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_228',
                            identify: "加班补助次数200%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_229',
                            identify: "加班补助次数215%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_230',
                            identify: "加班补助次数280%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_231',
                            identify: "加班补助次数300%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_232',
                            identify: "加班补助次数410%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        }
                    ]
                },
                {
                    id: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    amount: '0',
                    amountType: 'X',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_227',
                            identify: "加班补助次数150%",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_228',
                            identify: "加班补助次数200%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_229',
                            identify: "加班补助次数215%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_230',
                            identify: "加班补助次数280%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_231',
                            identify: "加班补助次数300%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_232',
                            identify: "加班补助次数410%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            id: 'Lang_28',
            identify: "夜班补贴45分钟",
            matchField: 'totalReward',
            amount: '0',
            amountType: 'X',
            income: '0.00',
            items: [
                {
                    id: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    amountType: 'X',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_237',
                            identify: "夜班补贴45分钟次数130%",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_238',
                            identify: "夜班补贴45分钟次数280%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_239',
                            identify: "夜班补贴45分钟次数410%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        }
                    ]
                },
                {
                    id: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    amount: '0',
                    amountType: 'X',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_237',
                            identify: "夜班补贴45分钟次数130%",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_238',
                            identify: "夜班补贴45分钟次数280%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_239',
                            identify: "夜班补贴45分钟次数410%",
                            matchField: 'baseSalary',
                            amount: '0',
                            amountType: 'X',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            id: 'Lang_210',
            identify: "总补贴",
            matchField: 'deduction',
            amount: '0',
            income: '0.00',
            items: [
                {
                    id: 'Lang_243',
                    identify: "小孩补贴",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_244',
                    identify: "油费补贴",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                }
            ]
        },
        {
            id: 'Lang_211',
            identify: "奖金",
            matchField: 'deduction',
            amount: '0',
            income: '0.00',
            items: [
                {
                    id: 'Lang_248',
                    identify: "效率奖",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    income: '0.00',
                    items: [
                        {
                            id: 'Lang_21',
                            identify: "试用期",
                            matchField: 'probationBaseSalary',
                            amount: '0',
                            income: '0.00',
                        },
                        {
                            id: 'Lang_22',
                            identify: "转正后",
                            matchField: 'baseSalary',
                            amount: '0',
                            income: '0.00',
                        }
                    ]
                },
                {
                    id: 'Lang_249',
                    identify: "纪律奖",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                    items: []
                },
                {
                    id: 'Lang_250',
                    identify: "超产奖",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                    items: []
                }
            ],
        },
        {
            id: 'Lang_212',
            identify: "其他",
            matchField: 'deduction',
            amount: '0',
            income: '0.00',
            items: [
                {
                    id: 'Lang_254',
                    identify: "餐补",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_255',
                    identify: "电话补",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_256',
                    identify: "住宿补贴",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_257',
                    identify: "工龄补贴",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_258',
                    identify: "福利",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                }
            ]
        },
        {
            id: 'Lang_213',
            identify: "扣款",
            matchField: 'deduction',
            amount: '0',
            income: '0.00',
            items: [
                {
                    id: 'Lang_259',
                    identify: "社保",
                    matchField: 'probationBaseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_260',
                    identify: "医保",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_261',
                    identify: "失业保",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_262',
                    identify: "个人所得税",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_263',
                    identify: "个税扣回",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_264',
                    identify: "工会费",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                },
                {
                    id: 'Lang_265',
                    identify: "其他扣款",
                    matchField: 'baseSalary',
                    amount: '0',
                    income: '0.00',
                }
            ]
        },
    ]
};

export const ShowModeB: Salary = {
    totalIncoming: '0,00',
    currencySymbol: '₫',
    hasTranslated: false,
    date: DateUtil.getYearMonth(),
    incomes: [
        {
            id: 'Lang_23',
            identify: "工资",
            matchField: 'totalBaseSalary',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_24',
            identify: "加班费",
            matchField: 'totalPositionAllowance',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_25',
            identify: "待工时数",
            matchField: 'totalOvertimeSalary',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_26',
            identify: "有薪假",
            matchField: 'totalOvertimeAllowance',
            amount: '0',
            amountType: 'H',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_27',
            identify: "加班补助次数",
            matchField: 'totalAllowance',
            amount: '0',
            amountType: 'X',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_28',
            identify: "夜班补贴45分钟",
            matchField: 'totalReward',
            amount: '0',
            amountType: 'X',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_210',
            identify: "总补贴",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_211',
            identify: "奖金",
            matchField: 'deduction',
            income: '0.00',
            items: [],
        },
        {
            id: 'Lang_212',
            identify: "其他",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
        {
            id: 'Lang_213',
            identify: "扣款",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
    ]
};

