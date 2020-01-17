import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IMessage, Message } from 'app/shared/model/message.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  messages?: IMessage[];

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {
    const lesMessageDeTest = [
      new Message(1, 'salut', 'paul', false, new Date(), 'text'),
      new Message(2, 'coucou', 'edwin', true, new Date(), 'text')
    ];
    this.messages = lesMessageDeTest;
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  sendMessage($event: { message: string; files: File[] }): any {
    return $event;
  }
}
