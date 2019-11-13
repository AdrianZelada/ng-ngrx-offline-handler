import { Action, createReducer, on } from '@ngrx/store';

import { OfflineQueueState } from './offline-queue.state';
import { queueAction, enqueuedCachedOfflineActions } from './offline-queue.actions';


const reducer = createReducer<OfflineQueueState>(
  { actions: [], lastAdded: null },
  on(queueAction, (state, { payload }) => appendAction(state, payload)),
  on(enqueuedCachedOfflineActions, (state,  ) => clearQueue(state)),
);

function appendAction(
  state: OfflineQueueState,
  payload: Action): OfflineQueueState {
    const queuedAction = {
      ...payload, 
      meta: {
        ...(payload as any).meta,
        isEnqueued: true
    }};

    return  {
      ...state,
      actions: [...state.actions, queuedAction],
      lastAdded: queuedAction
    }
}

function clearQueue(
  state: OfflineQueueState
): OfflineQueueState {
  return {
    ...state,
    actions: []
  }
}

export function offlineQueueReducer(
  state: OfflineQueueState | undefined,
  action: Action) {
  return reducer(state, action);
}