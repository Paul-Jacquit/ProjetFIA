import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { DriveComponent } from './drive.component';

export const driveRoute: Routes = [
  {
    path: '',
    component: DriveComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Drives'
    },
    canActivate: [UserRouteAccessService]
  }
];
