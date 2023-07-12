import { createAction, props } from '@ngrx/store';

export const setPaymentSuccess = createAction('Set Payment', props<{ paymentSuccess: boolean }>());
