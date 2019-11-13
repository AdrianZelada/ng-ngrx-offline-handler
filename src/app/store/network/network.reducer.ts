import { Action, createReducer, on } from '@ngrx/store';
import { NetworkState } from './network.state';
import { goOnline, goOffline } from './network.actions';


const reducer = createReducer<NetworkState>(
  { isOffline: true },
  on(goOnline, (state) => ({
    ...state,
    isOffline: false
  })),
  on(goOffline, (state) => ({
    ...state,
    isOffline: true
  })),
);

export function networkReducer(
  state: NetworkState | undefined,
  action: Action) {
  return reducer(state, action);
}