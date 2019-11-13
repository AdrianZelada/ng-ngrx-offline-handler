import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Counter] Add value',
  props<{ payload: { value: number } }>()
);

export const randomAdd = createAction(
  '[Counter] Add random value'
);

export const substract = createAction(
  '[Counter] Substract value',
  (value = 0) => ({ 
    payload: { value }
  })
);

export const triggerSubstract = createAction(
  '[Counter] Start substracting value',
  props<{ payload: { value: number } }>()
);
