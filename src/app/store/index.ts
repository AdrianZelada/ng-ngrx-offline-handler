import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import { CounterState, counterReducer } from './counter';
import { LoggerState, loggerReducer } from './logger';
import { NetworkState, networkReducer } from './network';
import {
  OfflineQueueState,
  offlineQueueReducer,
  queueAction
} from './offline-queue';

export interface State {
  counter: CounterState
  logger: LoggerState
  network: NetworkState,
  offlineQueue: OfflineQueueState

}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer,
  logger: loggerReducer,
  network: networkReducer,
  offlineQueue: offlineQueueReducer
}


export function network(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: State, action) {
    if (!!state && state.network.isOffline && isQueueable(action)) {
      return reducer(state, queueAction({ payload: action }))
    }

    if (!!state && !state.network.isOffline && skipOnline(action)) {
      return reducer(state, { type: 'NOOP' })
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [];

function isQueueable(action) {
  return !!action.meta && action.meta.queueIfOffline;
}

function skipOnline(action) {
  return !!action.meta &&
    action.meta.isEnqueued &&
    action.meta.skipOnline;
}