import { Component } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OfflineQueueState, queuedActions } from '../../store/offline-queue';

@Component({
  selector: 'app-offline-queue-monitor',
  templateUrl: './offline-queue-monitor.component.html',
  styleUrls: ['./offline-queue-monitor.component.css']
})
export class OfflineQueueMonitorComponent {
  queue$: Observable<Action[]>;

  constructor(private store: Store<OfflineQueueState>) {
    this.queue$ = this.store.pipe(select(queuedActions));
  }
}