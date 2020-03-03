import {createReducer, on} from '@ngrx/store';
import { increment} from '../actions/counter.actions';

export const initialState = 9;

export const _counterReducer = createReducer(initialState,
    on(increment, state => state + 1),
  
);

