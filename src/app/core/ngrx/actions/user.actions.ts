import {createAction, props} from '@ngrx/store';

export const userInfoUpddate = createAction('[user curd] user info has update');

export const userLogOut = createAction('[user curd] user info has logOut', props<{ hasLogout: boolean }>());

