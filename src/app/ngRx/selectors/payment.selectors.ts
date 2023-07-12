import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from '../reducers/payment.reducer';

export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const selectPaymentSuccess = createSelector(
  selectPaymentState,
  state => state.paymentSuccess
);
