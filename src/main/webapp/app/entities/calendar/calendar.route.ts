import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

import { CalendarComponent } from './calendar.component';

export const calendarRoute: Routes = [
  {
    path: '',
    component: CalendarComponent,
    data: {
      authorities: ['ROLE_USER', 'ROLE_L3', 'ROLE_M1', 'ROLE_M2'],
      pageTitle: 'Calendars'
    },
    canActivate: [UserRouteAccessService]
  }
];
