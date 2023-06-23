import { createAction, props } from '@ngrx/store';
import { ICampground } from '@shared';

export const setCampground = createAction('Set Campground', props<{ campground: ICampground }>());
export const setCampgrounds = createAction(
  'Set Campgrounds',
  props<{ campgrounds: ICampground[] }>()
);
export const clearCampground = createAction('[Campground] Clear Campground');
