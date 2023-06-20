import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampgroundState } from '../reducers/campground.reducer';

export const selectCampgroundState = createFeatureSelector<CampgroundState>('campground');

export const selectCampground = createSelector(selectCampgroundState, state => state.campground);
export const campgroundList = createSelector(selectCampgroundState, state => state.campgrounds);
