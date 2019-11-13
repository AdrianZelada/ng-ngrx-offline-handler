import { Injectable, ɵisObservable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { State } from '..';
import { isOffline } from '../network';

export interface HandlingOptions {
  offline: () => Action|Observable<Action>;
  online: () => Action|Observable<Action>;
}

@Injectable({ providedIn: 'root' })
export class OfflineHandler {
  constructor(private store: Store<State>) { }

  act(options: HandlingOptions): Observable<Action> {
    return this.store.pipe(
      select(isOffline),
      switchMap(isOffline => isOffline
        ? toObservable(options.offline())
        : toObservable(options.online())
      )
    )
  }
}

function toObservable<T>(value: Observable<T>|T): Observable<T> {
  if (ɵisObservable(value)) {
    return value;
  }

  return of(value);
}