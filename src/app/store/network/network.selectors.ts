import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NetworkState } from './network.state';


const visitNetwork = createFeatureSelector<NetworkState>('network');

export const isOffline = createSelector(
  visitNetwork,
  network => network.isOffline
);