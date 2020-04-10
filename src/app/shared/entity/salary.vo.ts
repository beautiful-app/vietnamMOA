import {DateUtil} from '../utils/date.util';

class salaryItem {
    matchField: string;
    name?: string;
    income: string;
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
            name: 'Lang_25',
            matchField: 'totalBaseSalary',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    matchField: 'probationBaseSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    matchField: 'baseSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_26',
            matchField: 'totalPositionAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    matchField: 'probationPositionAllowance',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    matchField: 'positionAllowance',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_27',
            matchField: 'totalOvertimeSalary',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    matchField: 'probationOvertimeSalary',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    matchField: 'overtimeSalary',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_28',
            matchField: 'totalOvertimeAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_21',
                    matchField: 'probationOvertimeAllowance',
                    income: '0.00',
                },
                {
                    name: 'Lang_22',
                    matchField: 'overtimeAllowance',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_29',
            matchField: 'totalAllowance',
            income: '0.00',
            items: [
                {
                    name: 'Lang_210',
                    matchField: 'babyAllowance',
                    income: '0.00',
                },
                {
                    name: 'Lang_211',
                    matchField: 'oilAllowance',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_212',
            matchField: 'totalReward',
            income: '0.00',
            items: [
                {
                    name: 'Lang_213',
                    matchField: 'meritReward',
                    income: '0.00',
                },
                {
                    name: 'Lang_214',
                    matchField: 'disciplineReward',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_215',
            matchField: 'other',
            income: '0.00',
            items: [
                {
                    name: 'Lang_216',
                    matchField: 'welfare',
                    income: '0.00',
                },
                {
                    name: 'Lang_217',
                    matchField: 'workAgeAllowance',
                    income: '0.00',
                }
            ]
        },
        {
            name: 'Lang_218',
            matchField: 'deduction',
            income: '0.00',
            items: [
                {
                    name: 'Lang_219',
                    matchField: 'socialInsurance',
                    income: '0.00',
                },
                {
                    name: 'Lang_220',
                    matchField: 'medicalInsurance',
                    income: '0.00',
                },
                {
                    name: 'Lang_221',
                    matchField: 'unemploymentInsurance',
                    income: '0.00',
                },
                {
                    name: 'Lang_222',
                    matchField: 'personalTax',
                    income: '0.00',
                },
                {
                    name: 'Lang_223',
                    matchField: 'tradeUnionFee',
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
            name: 'Lang_25',
            matchField: 'totalBaseSalary',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_26',
            matchField: 'totalPositionAllowance',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_27',
            matchField: 'totalOvertimeSalary',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_28',
            matchField: 'totalOvertimeAllowance',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_29',
            matchField: 'totalAllowance',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_212',
            matchField: 'totalReward',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_215',
            matchField: 'other',
            income: '0.00',
            items: []
        },
        {
            name: 'Lang_218',
            matchField: 'deduction',
            income: '0.00',
            items: []
        },
    ]
};

// export const PlanB: Salary = {
//     totalIncoming: '57888,6895,00',
//     currencySymbol: '₫',
//     date: DateUtil.getYearMonth(),
//     incomes: [
//         {
//             name: 'Lang_23',
//             income: '1,500,000',
//             items: [
//                 {
//                     name: 'Lang_25',
//                     income: '1,500,000',
//                 },
//                 {
//                     name: 'Lang_26',
//                     income: '13,500,000',
//                 },
//                 {
//                     name: 'Lang_27',
//                     income: '850,000',
//                 }
//             ]
//         },
//         {
//             name: 'Lang_24',
//             income: '1,50200',
//             items: [
//                 {
//                     name: 'Lang_25',
//                     income: '19,500,000',
//                 },
//                 {
//                     name: 'Lang_28',
//                     income: '50,000',
//                 }
//             ]
//         },
//         {
//             name: 'Lang_29',
//             income: '1,500,000',
//             items: [
//                 {
//                     name: 'Lang_210',
//                     income: '11,50,000',
//                 },
//                 {
//                     name: 'Lang_211',
//                     income: '500,000',
//                 }
//             ]
//         },
//         {
//             name: 'Lang_212',
//             income: '1,500,000',
//             items: [
//                 {
//                     name: 'Lang_213',
//                     income: '11,500,000',
//                 },
//                 {
//                     name: 'Lang_214',
//                     income: '600,000',
//                 }
//             ]
//         },
//         {
//             name: 'Lang_215',
//             income: '1,50,000',
//             items: [
//                 {
//                     name: 'Lang_216',
//                     income: '18,500,000',
//                 },
//                 {
//                     name: 'Lang_217',
//                     income: '500,00',
//                 }
//             ]
//         },
//         {
//             name: 'Lang_218',
//             income: '1,500,000',
//             items: [
//                 {
//                     name: 'Lang_219',
//                     income: '18,500',
//                 },
//                 {
//                     name: 'Lang_220',
//                     income: '500,0',
//                 },
//                 {
//                     name: 'Lang_221',
//                     income: '500,0',
//                 }
//             ]
//         },
//     ]
// };
//
// export const PlanC: Salary = {
//     totalIncoming: '0.00',
//     currencySymbol: '₫',
//     date: DateUtil.getYearMonth(),
//     incomes: [
//         {
//             name: 'Lang_23',
//             income: '0.00',
//             items: [
//                 {
//                     name: 'Lang_219',
//                     income: '18,500',
//                 },
//                 {
//                     name: 'Lang_220',
//                     income: '500,0',
//                 },
//                 {
//                     name: 'Lang_221',
//                     income: '500,0',
//                 }
//             ]
//         },
//         {
//             name: 'Lang_24',
//             income: '0.00',
//             items: []
//         },
//         {
//             name: 'Lang_29',
//             income: '0.00',
//             items: []
//         },
//         {
//             name: 'Lang_212',
//             income: '0.00',
//             items: []
//         },
//         {
//             name: 'Lang_215',
//             income: '0.00',
//             items: []
//         },
//         {
//             name: 'Lang_218',
//             income: '0.00',
//             items: []
//         },
//     ]
// };
//
//


