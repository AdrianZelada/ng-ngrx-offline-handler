import { Component, OnInit } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NetworkState, goOnline, goOffline, isOffline } from '../../store/network';

@Component({
  selector: 'app-network-switch',
  templateUrl: './network-switch.component.html',
  styleUrls: ['./network-switch.component.css']
})
export class NetworkSwitchComponent {
  isOffline$: Observable<boolean>;

  constructor(private store: Store<NetworkState>) { 
    this.isOffline$ = this.store.pipe(select(isOffline));
  }

  goOnline() {
    this.store.dispatch(goOnline);
  }

  goOffline() {
    this.store.dispatch(goOffline);
  }

}