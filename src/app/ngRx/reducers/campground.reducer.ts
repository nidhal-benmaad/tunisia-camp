import { ActionReducer, createReducer, on } from '@ngrx/store';
import { setCampground, clearCampground } from '../actions/campground.actions';
import { ICampground } from '@shared';

export interface CampgroundState {
  campground: ICampground | null;
  campgrounds: ICampground[] | [];
}

const initialState: CampgroundState = {
  campground: null,
  campgrounds: [],
};

export const camgroundReducer = createReducer(
  initialState,
  on(setCampground, (state, { campground }) => ({ ...state, campground })),
  on(clearCampground, state => ({ ...state, campground: null }))
);

export function clearCampgroundReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'LOGOUT' || action.type === 'RESET') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
