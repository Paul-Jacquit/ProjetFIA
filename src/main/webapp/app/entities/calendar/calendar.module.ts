import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { CalendarComponent } from './calendar.component';
import { calendarRoute } from './calendar.route';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(calendarRoute)],
  declarations: [CalendarComponent],
  entryComponents: []
})
export class ProjetFiaCalendarModule {}
