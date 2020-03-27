import {createReducer, on} from '@ngrx/store';
import {downloadApk, newVersion} from '../actions/application.actions';

const initialState = -1;

const initialNewVersion = false;

const downloadApkReducer = createReducer(initialState,
    on(downloadApk, (state, rate) => rate.rate),
);

const newVersionReducer = createReducer(initialNewVersion,
    on(newVersion, (state, change) => {
            return change.newVersion;
        }
    ),
);

export function _downloadApkReducer(state, action) {
    return downloadApkReducer(state, action);
}

export function _newVersion(state, action) {
    return newVersionReducer(state, action);
}
