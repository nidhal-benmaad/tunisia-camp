import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from '../reducers/reservation.reducer';

export const selectReservationState = createFeatureSelector<ReservationState>('reservation');

export const selectReservation = createSelector(selectReservationState, state => state.reservation);
export const reservationList = createSelector(selectReservationState, state => state.reservations);
