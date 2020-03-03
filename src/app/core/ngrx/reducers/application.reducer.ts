import {createReducer, on} from '@ngrx/store';
import {downloadApk} from '../actions/application.actions';

export const initialState = -1;

export const _downloadApkReducer = createReducer(initialState,
    on(downloadApk, (state, rate) => rate.rate),
);
