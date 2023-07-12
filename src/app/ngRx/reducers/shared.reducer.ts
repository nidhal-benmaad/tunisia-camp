import { ActionReducer, createReducer, on } from '@ngrx/store';
import { setFilter } from '../actions/shared.actions';

const initialState: any = {
  filter: {},
};

export const sharedReducer = createReducer(
  initialState,
  on(setFilter, (state, { filter }) => ({ ...state, filter }))
);
