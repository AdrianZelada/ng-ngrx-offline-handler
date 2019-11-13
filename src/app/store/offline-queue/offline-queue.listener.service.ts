import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { State } from '..'
import { triggerContinuation } from './offline-queue.actions'
import { lastAdded } from './offline-queue.selectors'

@Injectable({ providedIn: 'root' })
export class OfflineQueueListener {
  private queue$: Observable<Action[]>;

  constructor(private store: Store<State>) {}

  listen() {
    return this.store.pipe(
      select(lastAdded),
      filter(action => hasContinuation(action)),
      tap((actionWithContinuation: any) => 
        this.store.dispatch(triggerContinuation({
          payload: {
            type: actionWithContinuation.meta.continuation,
            payload: actionWithContinuation.payload
          }
        }))
      )
    )
  }e
}

function hasContinuation(action: Action & { meta?: any }) {
  return !!action && !!action.meta && !!action.meta.continuation;
}