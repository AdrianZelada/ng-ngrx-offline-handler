import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { filter, map, mapTo, tap, withLatestFrom } from 'rxjs/operators';

import { queuedActions } from './offline-queue.selectors';
import {
  retryQueuedActions,
  enqueuedCachedOfflineActions,
  triggerContinuation
} from './offline-queue.actions';

import { goOnline } from '../network';

import { State } from '..';

@Injectable()
export class OfflineQueueEffects {
  checkOfflineQueue = createEffect(() => this.actions$.pipe(
    ofType(goOnline),
    withLatestFrom(this.store.pipe(select(queuedActions))),
    map(([, queue]) => queue.length > 0
      ? retryQueuedActions({ payload: queue })
      : { type: 'NOOP' })
  ));

  performRetryAttempt = createEffect(() => this.actions$.pipe(
    ofType(retryQueuedActions),
    tap(({ payload: actions }) => 
      actions.forEach(action => this.store.dispatch(action))
    ),
    mapTo(enqueuedCachedOfflineActions())
  ));

  triggerOfflineContinuation = createEffect(() => this.actions$.pipe(
    ofType(triggerContinuation),
    map(({ payload: action }) => action))
  );

  constructor(private actions$: Actions, private store: Store<State>) { }
}