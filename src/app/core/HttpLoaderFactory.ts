import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader} from '@ngx-translate/core';


export function translateModuleConfig() {
    return {
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    };
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

