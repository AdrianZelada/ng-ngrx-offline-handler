import { Action } from '@ngrx/store';

export interface OfflineQueueState {
  actions: Action[];
  lastAdded: Action|null;
}