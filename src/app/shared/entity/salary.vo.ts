import {DateUtil} from '../utils/date.util';

/**
 * @Description: 薪资实体
 */
class salaryItem {
    name: string;
    identify?: string;        // 中文标识
    matchField: string;		// 用于匹配后端接口对应字段
    amount?: number;         // 合计时间/次数
    amountType?: string;     // 类型：时间/次数
    income: string;
    items?: salaryItem[] | null;    // 薪资查询数据
    itemsElse?: salaryItem[];
}

export class Incomes extends salaryItem {
    items: salaryItem[] | null;
}

export class Salary {
    totalIncoming: string;
    currencySymbol: string;
    hasTranslated: boolean;
    date: string;
    incomes: Incomes[];
}

export const PlanA: Salary = {
    totalIncoming: '0,00',
    currencySymbol: '₫',
    hasTranslated: false,
    date: DateUtil.getYearMonth(),
    incomes: [
        {
            name: 'Lang_23',
            identify: "底薪",
            matchField: 'totalBaseSalary',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_214',
                            identify: "100%的底薪",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_215',
                            identify: "130%的底薪",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_214',
                            identify: "100%的底薪",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_215',
                            identify: "130%的底薪",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_24',
            identify: "加班费",
            matchField: 'totalPositionAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_216',
                            identify: "加班150%时数",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_217',
                            identify: "加班200%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_218',
                            identify: "加班215%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_219',
                            identify: "加班280%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_220',
                            identify: "加班300%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_221',
                            identify: "加班410%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_216',
                            identify: "加班150%时数",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_217',
                            identify: "加班200%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_218',
                            identify: "加班215%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_219',
                            identify: "加班280%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_220',
                            identify: "加班300%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_221',
                            identify: "加班410%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_25',
            identify: "待工时数",
            matchField: 'totalOvertimeSalary',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_26',
            identify: "有薪假",
            matchField: 'totalOvertimeAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_27',
            identify: "加班补助次数",
            matchField: 'totalAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_227',
                            identify: "加班补助次数150%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_228',
                            identify: "加班补助次数200%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_229',
                            identify: "加班补助次数215%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_230',
                            identify: "加班补助次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_231',
                            identify: "加班补助次数300%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_232',
                            identify: "加班补助次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_227',
                            identify: "加班补助次数150%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_228',
                            identify: "加班补助次数200%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_229',
                            identify: "加班补助次数215%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_230',
                            identify: "加班补助次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_231',
                            identify: "加班补助次数300%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_232',
                            identify: "加班补助次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_28',
            identify: "夜班补贴45分钟",
            matchField: 'totalReward',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_237',
                            identify: "夜班补贴45分钟次数130%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_238',
                            identify: "夜班补贴45分钟次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_239',
                            identify: "夜班补贴45分钟次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_237',
                            identify: "夜班补贴45分钟次数130%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_238',
                            identify: "夜班补贴45分钟次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_239',
                            identify: "夜班补贴45分钟次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_29',
            identify: "岗位补贴",
            matchField: 'other',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_210',
            identify: "总补贴",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_211',
            identify: "奖金",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_248',
                    identify: "效率奖",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_21',
                            identify: "试用期",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_22',
                            identify: "转正后",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_249',
                    identify: "纪律奖",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_250',
                    identify: "超产奖",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_212',
            identify: "其他",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_254',
                    identify: "餐补",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_255',
                    identify: "电话补",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_256',
                    identify: "住宿补贴",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_257',
                    identify: "工龄补贴",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_258',
                    identify: "福利",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_213',
            identify: "扣款",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_259',
                    identify: "社保",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_260',
                    identify: "医保",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_261',
                    identify: "失业保",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_262',
                    identify: "个人所得税",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_263',
                    identify: "个税扣回",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_264',
                    identify: "工会费",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_265',
                    identify: "其他扣款",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
    ]
};

export const PlanAA: Salary = {
    totalIncoming: '0,00',
    currencySymbol: '₫',
    hasTranslated: false,
    date: DateUtil.getYearMonth(),
    incomes: [
        {
            name: 'Lang_23',
            identify: "底薪",
            matchField: 'totalBaseSalary',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_214',
                            identify: "100%的底薪",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_215',
                            identify: "130%的底薪",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_214',
                            identify: "100%的底薪",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_215',
                            identify: "130%的底薪",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_24',
            identify: "加班费",
            matchField: 'totalPositionAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_216',
                            identify: "加班150%时数",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_217',
                            identify: "加班200%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_218',
                            identify: "加班215%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_219',
                            identify: "加班280%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_220',
                            identify: "加班300%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_221',
                            identify: "加班410%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_216',
                            identify: "加班150%时数",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_217',
                            identify: "加班200%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_218',
                            identify: "加班215%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_219',
                            identify: "加班280%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_220',
                            identify: "加班300%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_221',
                            identify: "加班410%时数",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_25',
            identify: "待工时数",
            matchField: 'totalOvertimeSalary',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_26',
            identify: "有薪假",
            matchField: 'totalOvertimeAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_27',
            identify: "加班补助次数",
            matchField: 'totalAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_227',
                            identify: "加班补助次数150%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_228',
                            identify: "加班补助次数200%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_229',
                            identify: "加班补助次数215%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_230',
                            identify: "加班补助次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_231',
                            identify: "加班补助次数300%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_232',
                            identify: "加班补助次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_227',
                            identify: "加班补助次数150%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_228',
                            identify: "加班补助次数200%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_229',
                            identify: "加班补助次数215%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_230',
                            identify: "加班补助次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_231',
                            identify: "加班补助次数300%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_232',
                            identify: "加班补助次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_28',
            identify: "夜班补贴45分钟",
            matchField: 'totalReward',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_237',
                            identify: "夜班补贴45分钟次数130%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_238',
                            identify: "夜班补贴45分钟次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_239',
                            identify: "夜班补贴45分钟次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_237',
                            identify: "夜班补贴45分钟次数130%",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_238',
                            identify: "夜班补贴45分钟次数280%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_239',
                            identify: "夜班补贴45分钟次数410%",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Lang_29',
            identify: "岗位补贴",
            matchField: 'other',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_210',
            identify: "总补贴",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    identify: "试用期",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    identify: "转正后",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_211',
            identify: "奖金",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_248',
                    identify: "效率奖",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                    items: [
                        {
                            name: 'Lang_21',
                            identify: "试用期",
                            matchField: 'probationBaseSalary',
                            income: '0.00',
                        },
                        {
                            name: 'Lang_22',
                            identify: "转正后",
                            matchField: 'baseSalary',
                            income: '0.00',
                        }
                    ]
                },
            
            ],
            itemsElse: [
                {
                    name: 'Lang_249',
                    identify: "纪律奖",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_250',
                    identify: "超产奖",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_212',
            identify: "其他",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_254',
                    identify: "餐补",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_255',
                    identify: "电话补",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_256',
                    identify: "住宿补贴",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_257',
                    identify: "工龄补贴",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_258',
                    identify: "福利",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_213',
            identify: "扣款",
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_259',
                    identify: "社保",
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_260',
                    identify: "医保",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_261',
                    identify: "失业保",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_262',
                    identify: "个人所得税",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_263',
                    identify: "个税扣回",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_264',
                    identify: "工会费",
                    matchField: 'baseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_265',
                    identify: "其他扣款",
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
    ]
};

export const PlanB: Salary = {
    totalIncoming: '0,00',
    currencySymbol: '₫',
    hasTranslated: false,
    date: DateUtil.getYearMonth(),
    incomes: [
        {
            name: 'Lang_23',
            identify: "底薪",
            matchField: 'totalBaseSalary',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_24',
            identify: "加班费",
            matchField: 'totalPositionAllowance',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_25',
            identify: "待工时数",
            matchField: 'totalOvertimeSalary',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_26',
            identify: "有薪假",
            matchField: 'totalOvertimeAllowance',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_27',
            identify: "加班补助次数",
            matchField: 'totalAllowance',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_28',
            identify: "夜班补贴45分钟",
            matchField: 'totalReward',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_29',
            identify: "岗位补贴",
            matchField: 'other',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_210',
            identify: "总补贴",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_211',
            identify: "奖金",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_212',
            identify: "其他",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_213',
            identify: "扣款",
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
    ]
};


