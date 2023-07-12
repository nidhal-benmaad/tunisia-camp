import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectSharedState = createFeatureSelector<any>('shared');

export const selectFilter = createSelector(selectSharedState, state => state.filter);
