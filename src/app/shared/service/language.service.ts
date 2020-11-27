import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../const/language.const';
import {LanguageType} from '../const/language-type.enum';

@Injectable({providedIn: 'root'})
/**
 * 语言服务相关处理类
 */
export class LanguageService {
    private _sysLanguage: string = 'en';
    
    constructor(
        private translate: TranslateService,
    ) {
        // if (environment.production) this._sysLanguage = this.translate.getBrowserLang().substr(0, 2);
        this._sysLanguage = this.translate.getBrowserLang().substr(0, 2);
        // this._sysLanguage = LanguageType.en;
    }
    
    /**
     * 语言设置
     */
    languageSettings() {
        // 语言初始化(若未设置语言, 则取浏览器语言)
        // 当在assets/i18n中找不到对应的语言翻译时，使用'zh-CN'作为默认语言
        this.translate.setDefaultLang(LanguageType.en);
        this.translate.use(this._sysLanguage);
    }
    
    /**
     * 解析和配置系统中需要的语言常量
     */
    initStaticLanguage() {
        // 根据语言属性生成查询数组
        this.translate.getTranslation(this._sysLanguage).subscribe(r => {
            for (let langKey in Lang) {
                Lang[langKey] = r[langKey];
            }
        });
    }
    
    /**
     * 获取系统当前使用的语言
     */
    get sysLanguage(): string {
        return this._sysLanguage;
    }
}
