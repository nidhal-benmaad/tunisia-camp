import { ActionReducer, createReducer, on } from '@ngrx/store';
import { setReservation, clearReservation } from '../actions/reservation.actions';
import { IReservation } from '@shared';

export interface ReservationState {
  reservation: IReservation | null;
  reservations: IReservation[] | [];
}

const initialState: ReservationState = {
  reservation: null,
  reservations: [],
};

export const reservationReducer = createReducer(
  initialState,
  on(setReservation, (state, { reservation }) => ({ ...state, reservation })),
  on(clearReservation, state => ({ ...state, reservation: null }))
);

export function clearReservationReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'LOGOUT' || action.type === 'RESET') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
