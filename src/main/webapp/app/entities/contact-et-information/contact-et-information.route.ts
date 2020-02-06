import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContactEtInformation, ContactEtInformation } from 'app/shared/model/contact-et-information.model';
import { ContactEtInformationService } from './contact-et-information.service';
import { ContactEtInformationComponent } from './contact-et-information.component';
import { ContactEtInformationDetailComponent } from './contact-et-information-detail.component';

@Injectable({ providedIn: 'root' })
export class ContactEtInformationResolve implements Resolve<IContactEtInformation> {
  constructor(private service: ContactEtInformationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactEtInformation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contactEtInformation: HttpResponse<ContactEtInformation>) => {
          if (contactEtInformation.body) {
            return of(contactEtInformation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContactEtInformation());
  }
}

export const contactEtInformationRoute: Routes = [
  {
    path: '',
    component: ContactEtInformationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ContactEtInformations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContactEtInformationDetailComponent,
    resolve: {
      contactEtInformation: ContactEtInformationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ContactEtInformations'
    },
    canActivate: [UserRouteAccessService]
  }
];
