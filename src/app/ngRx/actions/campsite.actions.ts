import { createAction, props } from '@ngrx/store';
import { ICampsite, PageableList } from '@shared';

export const setCampsite = createAction('Set Campsite', props<{ campsite: ICampsite }>());
export const setCampsites = createAction('Set Campsites', props<{ campsites: PageableList }>());
export const clearCampsite = createAction('[Campsite] Clear Campground');
