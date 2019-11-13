import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfflineQueueListener } from './store/offline-queue';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'NgRx 8';

  sink = new Subscription();

  constructor(private queueListener: OfflineQueueListener) { }

  ngOnInit() {
    this.sink.add(this.queueListener.listen().subscribe());
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}
