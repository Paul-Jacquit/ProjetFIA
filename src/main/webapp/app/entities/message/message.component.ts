import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IMessage, Message } from 'app/shared/model/message.model';
import { MessageService } from './message.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: IMessage[];
  eventSubscriber?: Subscription;
  userLogin?: string;

  constructor(protected messageService: MessageService, protected eventManager: JhiEventManager, protected accountService: AccountService) {
    this.messages = [];

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.userLogin = account.login;
      }
    });
  }

  updateDiv(): void {
    const reloadInterval = 5000;
    setInterval(() => {
      this.getFlag();
    }, reloadInterval);
  }

  reloadMessage(data: IMessage[]): void {
    this.messages.push(...data);
  }

  getFlag(): void {
    const datetime = this.messages[this.messages.length - 1].date!;
    this.messageService.query({ 'date.greaterThan': datetime.toString() }).subscribe((res: HttpResponse<IMessage[]>) => {
      const newMessage = res.body ? res.body : [];
      newMessage;
      for (const m of newMessage) {
        if (m.user === this.userLogin) {
          m.reply = true;
        } else {
          m.reply = false;
        }
      }
      this.messages.push(...newMessage);
    });
  }

  loadAll(): void {
    this.messageService.query().subscribe((res: HttpResponse<IMessage[]>) => {
      this.messages = res.body ? res.body : [];

      for (const m of this.messages) {
        if (m.user === this.userLogin) {
          m.reply = true;
        } else {
          m.reply = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMessages();
    this.updateDiv();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerChangeInMessages(): void {
    this.eventSubscriber = this.eventManager.subscribe('messageListModification', () => this.loadAll());
  }

  sendMessage($event: { message: string; files: File[] }): void {
    const date = new Date();
    this.messageService.create(new Message($event.message, this.userLogin, true, date)).subscribe((res: HttpResponse<IMessage>) => {
      if (res.body) {
        this.messages.push(res.body);
      }
    });
  }
}
