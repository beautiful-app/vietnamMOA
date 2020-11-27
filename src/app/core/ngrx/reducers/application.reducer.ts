import {createReducer, on} from '@ngrx/store';
import {downloadApk, newVersion} from '../actions/application.actions';

const initialState = -999;

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

/**
 * 苹果系统编译环境不支持以上匿名函数的写法，所以换成一下形式进行兼容
 */
export function _downloadApkReducer(state, action) {
    return downloadApkReducer(state, action);
}

export function _newVersion(state, action) {
    return newVersionReducer(state, action);
}
