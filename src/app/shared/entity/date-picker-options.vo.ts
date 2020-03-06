export class datePicker {
    static options(page: any): DatePickerOptions {
        return {
            buttons: [
                {
                    text: '取消',
                    handler: ($event) => {
                    }
                },
                {
                    text: '确定',
                    handler: (event) => {
                        page.dateHandle(event);
                    }
                },
            ]
        };
    }
}

export class DatePickerOptions {
    buttons: (
        {
            handler: ($event) => boolean; text: string
        } | {
        handler: ($event) => void; text: string
    }
        )[];
};
