import {createAction, props} from '@ngrx/store';
import {USER} from '../../../shared/entity/user.bo';

export const increment = createAction('2', props<{ user: USER }>()
);
export const decrement = createAction('jjj');
export const reset = createAction('4');
