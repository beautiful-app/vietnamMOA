import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LanguageService {
    
    constructor(
        private translate: TranslateService,
    ) {
    }
    
    languageSettings() {
        // 语言初始化(若未设置语言, 则取浏览器语言)
        // // 当在assets/i18n中找不到对应的语言翻译时，使用'zh-CN'作为默认语言
        this.translate.setDefaultLang('vi');
        let language = this.translate.getBrowserLang();
        // this.translate.use(language.substr(0, 2));
        this.translate.use('en');
        console.log('#################成功设置语言');
    }
    
}
