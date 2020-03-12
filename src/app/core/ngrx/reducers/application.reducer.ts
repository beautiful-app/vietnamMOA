import {createReducer, on} from '@ngrx/store';
import {downloadApk, newVersion} from '../actions/application.actions';

const initialState = -1;

const initialNewVersion = false;

export const _downloadApkReducer = createReducer(initialState,
    on(downloadApk, (state, rate) => rate.rate),
);

export const _newVersion = createReducer(initialNewVersion,
    on(newVersion, (state, change) => {
            return change.newVersion;
        }
    ),
);
