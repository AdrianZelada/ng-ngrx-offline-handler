import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfflineQueueState } from './offline-queue.state';


const visitQueue = createFeatureSelector<OfflineQueueState>('offlineQueue');

export const queuedActions = createSelector(
  visitQueue,
  offlineQueue => offlineQueue.actions
);

export const lastAdded = createSelector(
  visitQueue,
  offlineQueue => offlineQueue.lastAdded
);