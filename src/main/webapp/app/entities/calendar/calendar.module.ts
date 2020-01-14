import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { CalendarComponent } from './calendar.component';
import { CalendarDetailComponent } from './calendar-detail.component';
import { calendarRoute } from './calendar.route';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(calendarRoute)],
  declarations: [CalendarComponent, CalendarDetailComponent],
  entryComponents: []
})
export class ProjetFiaCalendarModule {}
