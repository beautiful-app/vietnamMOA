import {createReducer, on} from '@ngrx/store';
import {userInfoUpddate} from '../actions/user.actions';

export const initialState = 0;

export const _userReducer = createReducer(initialState,
    on(userInfoUpddate, (state, user) => state + 1),
);


