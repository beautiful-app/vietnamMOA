import {createReducer, on} from '@ngrx/store';
import {userInfoUpddate, userLogOut} from '../actions/user.actions';

const initialState = 0;
const hasLogout = false;

const userReducer = createReducer(initialState,
	on(userInfoUpddate, (state, user) => {
		return state + 1;
	}),
);

const userLogoutReducer = createReducer(hasLogout,
	on(userLogOut, (state, hasLogout) => {
		return hasLogout.hasLogout;
	}),
);

/**
 * @Description: 苹果系统编译环境不支持以上匿名函数的写法，所以换成一下形式进行兼容
 */
export function _userReducer(state, action) {
	return userReducer(state, action);
}

export function _userLogoutReducer(state, action) {
	return userLogoutReducer(state, action);
}


