import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../const/language.const';
import {environment} from '../../../environments/environment';
import {LanguageType} from '../const/language-type.enum';

@Injectable({providedIn: 'root'})
export class LanguageService {
    private _sysLanguage: string = 'en';
    
    constructor(
        private translate: TranslateService,
    ) {
        if(environment.production) this._sysLanguage = this.translate.getBrowserLang().substr(0, 2);
        else this._sysLanguage = LanguageType.vi;
    }
    
    languageSettings() {
        // 语言初始化(若未设置语言, 则取浏览器语言)
        // // 当在assets/i18n中找不到对应的语言翻译时，使用'zh-CN'作为默认语言
        this.translate.setDefaultLang(LanguageType.vi);
        // if(!environment.production) this.translate.use(LanguageType.en);
        this.translate.use(this._sysLanguage);
    }
    
    // 获取代码中需要的语言
    initStaticLanguage() {
        // 根据语言属性生成查询数组
        let langKeyArr = [];
        for (let langKey in Lang) {
            langKeyArr.push(langKey);
        }
        this.translate.get(langKeyArr).subscribe(r => {
            for (let rKey in r) {
                if(rKey != r[rKey]) Lang[rKey] = r[rKey];
            }
        });
    }
    
    get(key: string) {
        this.translate.get('kjk').subscribe();
    }
    
    get sysLanguage(): string {
        return this._sysLanguage;
    }
}
