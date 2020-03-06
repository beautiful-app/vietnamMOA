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
            name: '试用期工资',
            income: '1,500,000',
            items: [
                {
                    name: '个人所得说',
                    income: '1,500,000',
                },
                {
                    name: '旅游补贴',
                    income: '18,500,000',
                },
                {
                    name: '熬夜补贴',
                    income: '500,000',
                }
            ]
        },
        {
            name: '旅游补贴',
            income: '1,500,000',
            items: [
                {
                    name: '差旅费',
                    income: '18,500,000',
                },
                {
                    name: '养猪饲料补贴',
                    income: '500,000',
                }
            ]
        }
    
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






