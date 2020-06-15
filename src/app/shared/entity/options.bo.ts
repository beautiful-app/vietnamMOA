import {HttpHeaders, HttpParams} from '@angular/common/http';

/**
 * @Description: httpclient请求options实体
 */
export class options {
	headers?: HttpHeaders | { [header: string]: string | string[]; };
	observe?: 'body';
	params?: HttpParams | { [param: string]: string | string[]; };
	reportProgress?: boolean;
	responseType?: 'json';
	withCredentials?: boolean;
}
