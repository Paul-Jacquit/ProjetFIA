import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICalendar } from 'app/shared/model/calendar.model';

@Component({
  selector: 'jhi-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendars?: ICalendar[];
  eventSubscriber?: Subscription;

  constructor(protected eventManager: JhiEventManager) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
}
