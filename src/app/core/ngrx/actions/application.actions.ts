import {createAction, props} from '@ngrx/store';

export const downloadApk = createAction('[download file] download progress of android apk ', props<{ rate: number }>());

export const newVersion = createAction('[new version] There is a new version', props<{ newVersion: boolean }>());
