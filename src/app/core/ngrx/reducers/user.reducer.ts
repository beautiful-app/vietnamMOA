import {createReducer, on} from '@ngrx/store';
import {userInfoUpddate, userLogOut} from '../actions/user.actions';

const initialState = 0;
const hasLogout = false;

const userReducer = createReducer(initialState,
    on(userInfoUpddate, (state, user) => {
        console.log('userReducer:', state);
        return state + 1;
    }),
);

const userLogoutReducer = createReducer(hasLogout,
    on(userLogOut, (state, hasLogout) => {
        console.log('调用了userLogout', hasLogout);
        return hasLogout.hasLogout;
    }),
);

export function _userReducer(state, action) {
    return userReducer(state, action);
}

export function _userLogoutReducer(state, action) {
    return userLogoutReducer(state, action);
}


