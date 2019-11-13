import { Injectable } from '@angular/core';

import { 
  Actions,
  createEffect,
  ofType,
  act
} from '@ngrx/effects';
import { Action , Store} from '@ngrx/store';

import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { logInfo } from '../logger';
import { add, randomAdd, substract, triggerSubstract } from './counter.actions';
import { queueAction, OfflineQueueState } from '../offline-queue';
import { OfflineHandler } from '../lib';

@Injectable()
export class CounterEffects {
  randomAdd = createEffect(() => this.actions.pipe(
    ofType(randomAdd),
    act({
      project: () => generateValue().pipe(
              map(value => add({ payload: { value } }))
            ),
      error: message => logInfo(message)
    })
  ));

  substract = createEffect(() => this.actions.pipe(
    ofType(triggerSubstract),
    switchMap(action => this.offlineHandler.act({
      offline: () => {
        this.store.dispatch(queueAction(({ payload: action })));
        return substract(action.payload.value);
      },
      online: () => isFromQueue(action) 
        ? logInfo(action.type) 
        : substract(action.payload.value)
    }))
  ));

  constructor(
    private actions: Actions,
    private store: Store<OfflineQueueState>,
    private offlineHandler: OfflineHandler
  ) { }
}

function generateValue(): Observable<number> {
  const value = Math.floor(Math.random() * 10);

  if (value > 5) {
    return throwError(
      `Generated number should not be greater than 5 (was ${value})`
    );
  }

  return of(value || 1);
}

function isFromQueue(action: Action & { meta?: any }): boolean {
  return !!action.meta && action.meta.isEnqueued;
}