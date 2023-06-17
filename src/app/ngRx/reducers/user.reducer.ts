import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from '../actions/user.actions';
import { IUser } from '@shared';

export interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(clearUser, state => ({ ...state, user: null }))
);
