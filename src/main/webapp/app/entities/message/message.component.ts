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
  channel?: string;
  id?: any;

  constructor(protected messageService: MessageService, protected eventManager: JhiEventManager, protected accountService: AccountService) {
    this.messages = [];
    this.channel = 'G';

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.userLogin = account.login;
      }
    });
  }

  updateDiv(): void {
    const reloadInterval = 1000;
    this.id = setInterval(() => {
      this.getFlag();
    }, reloadInterval);
  }

  getFlag(): void {
    if (this.messages.length > 0) {
      const datetime = this.messages[this.messages.length - 1].date!;
      this.messageService
        .query({ 'date.greaterThan': datetime.toString(), 'channel.equals': this.channel })
        .subscribe((res: HttpResponse<IMessage[]>) => {
          const newMessage = res.body ? res.body : [];
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
  }

  loadAll(): void {
    this.messageService.query({ 'channel.equals': this.channel }).subscribe((res: HttpResponse<IMessage[]>) => {
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
    if (this.id) {
      clearInterval(this.id);
    }
  }

  registerChangeInMessages(): void {
    this.eventSubscriber = this.eventManager.subscribe('messageListModification', () => this.loadAll());
  }

  sendMessage($event: { message: string; files: File[] }): void {
    const date = new Date();
    this.messageService.create(new Message($event.message, this.userLogin, date, this.channel)).subscribe((res: HttpResponse<IMessage>) => {
      if (res.body) {
        res.body.reply = true;
        this.messages.push(res.body);
      }
    });
  }

  setChannel($event: any): void {
    this.channel = $event.target.value;
    this.loadAll();
  }
}
