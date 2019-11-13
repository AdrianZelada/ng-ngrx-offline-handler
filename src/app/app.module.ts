import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './store';
import { CounterEffects } from './store/counter';
import { OfflineQueueEffects } from './store/offline-queue';

import { AppComponent } from './app.component';
import { SimpleCounterComponent } from './containers/simple-counter/simple-counter.component';
import { LogMonitorComponent } from './containers/log-monitor/log-monitor.component';
import { OfflineQueueMonitorComponent } from './containers/offline-queue-monitor/offline-queue-monitor.component';
import { NetworkSwitchComponent } from './containers/network-switch/network-switch.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    EffectsModule.forRoot([CounterEffects, OfflineQueueEffects]),
    StoreDevtoolsModule.instrument({ name: 'NgRx Offline First' })
  ],
  declarations: [
    AppComponent,
    SimpleCounterComponent,
    LogMonitorComponent,
    OfflineQueueMonitorComponent,
    NetworkSwitchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
