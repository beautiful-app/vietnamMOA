import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader} from '@ngx-translate/core';

/**
 * 翻译配置方法
 */
export function translateModuleConfig() {
	return {
		loader: {
			provide: TranslateLoader,
			useFactory: HttpLoaderFactory,
			deps: [HttpClient]
		}
	};
}

/**
 * 返回翻译请求对象工场方法，用于根据翻译文本信息动态创建翻译请求方法
 */
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

