import { ActionReducer, createReducer, on } from '@ngrx/store';
import { setCampsite, clearCampsite, setCampsites } from '../actions/campsite.actions';
import { ICampsite, PageableList } from '@shared';

export interface CampsiteState {
  campsite: ICampsite | null;
  campsites: PageableList;
}

const initialState: CampsiteState = {
  campsite: null,
  campsites: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
  },
};

export const campsiteReducer = createReducer(
  initialState,
  on(setCampsite, (state, { campsite }) => ({ ...state, campsite })),
  on(setCampsites, (state, { campsites }) => ({ ...state, campsites })),
  on(clearCampsite, state => ({ ...state, campsite: null }))
);

export function clearCampsiteReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'LOGOUT' || action.type === 'RESET') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
