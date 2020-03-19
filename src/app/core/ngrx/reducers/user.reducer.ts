import {createReducer, on} from '@ngrx/store';
import {userInfoUpddate, userLogOut} from '../actions/user.actions';

const initialState = 0;
const hasLogout = false;

export const _userReducer = createReducer(initialState,
    on(userInfoUpddate, (state, user) => {
        console.log('userReducer:', state);
        return state + 1;
    }),
);

export const _userLogoutReducer = createReducer(hasLogout,
    on(userLogOut, (state, hasLogout) => {
        console.log('userLogout', hasLogout);
        return hasLogout.hasLogout;
    }),
);



