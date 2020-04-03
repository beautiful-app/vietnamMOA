import {Lang} from '../const/language.const';

export class datePicker {
    static options(page: any): DatePickerOptions {
        return {
            buttons: [
                {
                    text: Lang.Lang_89_3,
                    handler: ($event) => {
                    }
                },
                {
                    text: Lang.Lang_89_5,
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
