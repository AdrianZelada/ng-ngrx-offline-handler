import { Action, createAction, props } from '@ngrx/store';

export const queueAction = createAction(
  '[Offline Queue] Queue action',
  props<{ payload: Action }>()
);

export const enqueuedCachedOfflineActions = createAction(
  '[Offline Queue] Enqueued cached offline actions',
);

export const retryQueuedActions = createAction(
  '[Offline Queue] Retry actions',
  props<{ payload: Action[] }>()
);

export const triggerContinuation = createAction(
  '[Offline Queue] Trigger continuation of queued action',
  props<{ payload: Action & { payload: any } }>()
);
