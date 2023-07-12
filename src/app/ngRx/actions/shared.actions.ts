import { createAction, props } from '@ngrx/store';

export const setFilter = createAction('Set Filter', props<{ filter: any }>());
