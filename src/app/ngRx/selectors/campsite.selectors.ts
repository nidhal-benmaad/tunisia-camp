import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampsiteState } from '../reducers/campsite.reducer';

export const selectCampsiteState = createFeatureSelector<CampsiteState>('campsite');

export const selectCampsite = createSelector(selectCampsiteState, state => state.campsite);
export const campsiteList = createSelector(selectCampsiteState, state => state.campsites);
