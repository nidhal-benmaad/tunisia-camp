import { ActionReducer, createReducer, on } from '@ngrx/store';
import { setPaymentSuccess } from '../actions/payment.actions';

export interface PaymentState {
  paymentSuccess: boolean;
}

const initialState: PaymentState = {
  paymentSuccess: false,
};

export const paymentReducer = createReducer(
  initialState,
  on(setPaymentSuccess, (state, { paymentSuccess }) => ({ ...state, paymentSuccess }))
);

export function clearReservationReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'LOGOUT' || action.type === 'RESET') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
