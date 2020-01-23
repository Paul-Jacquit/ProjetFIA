import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMessage, Message } from 'app/shared/model/message.model';
import { MessageService } from './message.service';
import { MessageComponent } from './message.component';

@Injectable({ providedIn: 'root' })
export class MessageResolve implements Resolve<IMessage> {
  constructor(private service: MessageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMessage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((message: HttpResponse<Message>) => {
          if (message.body) {
            return of(message.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Message());
  }
}

export const messageRoute: Routes = [
  {
    path: '',
    component: MessageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Messages'
    },
    canActivate: [UserRouteAccessService]
  }
];
