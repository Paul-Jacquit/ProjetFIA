import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Menu_RuComponent } from './menu-ru.component';

export const menu_RuRoute: Routes = [
  {
    path: '',
    component: Menu_RuComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Menu_Rus'
    },
    canActivate: [UserRouteAccessService]
  }
];
