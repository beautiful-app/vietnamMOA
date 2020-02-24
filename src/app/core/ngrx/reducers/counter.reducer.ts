import {createReducer, on} from '@ngrx/store';
import {decrement, increment, reset} from '../actions/counter.actions';

export const initialState = 9;

export const _counterReducer = createReducer(initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(reset, state => 0),
);

// export function counterReducer(state, action) {
//     return _counterReducer(state, action);
// }
