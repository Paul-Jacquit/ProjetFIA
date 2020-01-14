import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICalendar } from 'app/shared/model/calendar.model';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'jhi-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendars?: ICalendar[];
  eventSubscriber?: Subscription;

  constructor(protected calendarService: CalendarService, protected eventManager: JhiEventManager) {}

  loadAll(): void {
    this.calendarService.query().subscribe((res: HttpResponse<ICalendar[]>) => {
      this.calendars = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCalendars();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICalendar): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCalendars(): void {
    this.eventSubscriber = this.eventManager.subscribe('calendarListModification', () => this.loadAll());
  }
}
