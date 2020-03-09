class salaryItem {
    name: string;
    income: string;
}

export class Incomes extends salaryItem {
    items: salaryItem[] | null;
}

export class Salary {
    totalIncoming: string;
    currencySymbol: string;
    incomes: Incomes[];
}


export const PlanA: Salary = {
    totalIncoming: '57888,6895,00',
    currencySymbol: '₫',
    incomes: [
        {
            name: 'Lang_23',
            income: '1,500,000',
            items: [
                {
                    name: 'Lang_25',
                    income: '1,500,000',
                },
                {
                    name: 'Lang_26',
                    income: '13,500,000',
                },
                {
                    name: 'Lang_27',
                    income: '850,000',
                }
            ]
        },
        {
            name: 'Lang_24',
            income: '1,50200',
            items: [
                {
                    name: 'Lang_25',
                    income: '19,500,000',
                },
                {
                    name: 'Lang_28',
                    income: '50,000',
                }
            ]
        },
        {
            name: 'Lang_29',
            income: '1,500,000',
            items: [
                {
                    name: 'Lang_210',
                    income: '11,50,000',
                },
                {
                    name: 'Lang_211',
                    income: '500,000',
                }
            ]
        },
        {
            name: 'Lang_212',
            income: '1,500,000',
            items: [
                {
                    name: 'Lang_213',
                    income: '11,500,000',
                },
                {
                    name: 'Lang_214',
                    income: '600,000',
                }
            ]
        },
        {
            name: 'Lang_215',
            income: '1,50,000',
            items: [
                {
                    name: 'Lang_216',
                    income: '18,500,000',
                },
                {
                    name: 'Lang_217',
                    income: '500,00',
                }
            ]
        },
        {
            name: 'Lang_218',
            income: '1,500,000',
            items: [
                {
                    name: 'Lang_219',
                    income: '18,500',
                },
                {
                    name: 'Lang_220',
                    income: '500,0',
                },
                {
                    name: 'Lang_221',
                    income: '500,0',
                }
            ]
        },
    
    
    ]
};


export const PlanB: Salary = {
    totalIncoming: '57888,6895,00',
    currencySymbol: '₫',
    incomes: [
        {
            name: 'PROBATION_PAY',
            income: '1,500,000',
            items: [
                {
                    name: 'BASE_PAY',
                    income: '1,500,000',
                },
                {
                    name: 'BASE_PAY',
                    income: '18,500,000',
                }
            ]
        },
        {
            name: 'TABS.SALARY',
            income: '1,000',
            items: [
                {
                    name: 'BASE_PAY',
                    income: '500,000',
                },
                {
                    name: 'BASE_PAY',
                    income: '1500,000',
                }
            ]
        }
    ]
};






