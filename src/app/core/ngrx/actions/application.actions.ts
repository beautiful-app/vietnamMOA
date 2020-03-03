import {createAction, props} from '@ngrx/store';

export const downloadApk = createAction('[download file] download progress of android apk ', props<{ rate: number }>());

