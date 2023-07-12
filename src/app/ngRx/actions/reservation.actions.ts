import { createAction, props } from '@ngrx/store';
import { IReservation } from '@shared';

export const setReservation = createAction(
  'Set Reservation',
  props<{ reservation: IReservation }>()
);
export const setReservations = createAction(
  'Set Reservations',
  props<{ reservations: IReservation[] }>()
);
export const clearReservation = createAction('[Reservation] Clear Reservation');
