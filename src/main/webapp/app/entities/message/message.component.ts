import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMessage, Message } from 'app/shared/model/message.model';
import { MessageService } from './message.service';
import { AccountService } from 'app/core/auth/account.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: IMessage[];
  eventSubscriber?: Subscription;
  userLogin?: string;
  messageReceivedFlag?: boolean;
  flag = false;

  constructor(
    protected messageService: MessageService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected accountService: AccountService
  ) {
    this.messages = [];

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.userLogin = account.login;
      }
    });
  }

  updateInside(): void {
    this.getFlag();
  }
  /*
  donneLeMenu(): string {
    //this.getMenu();
    return this.flag;
  }
   */

  updateDiv(): void {
    const reloadInterval = 5000;
    setInterval(() => {
      this.updateInside();
    }, reloadInterval);
  }

  setFlag(data: string): boolean {
    // eslint-disable-next-line no-console
    console.log('data = ' + data);
    const flagTest = data === 'true';
    if (flagTest) {
      document.getElementById('chat-view')!.innerHTML = document.getElementById('chat-view')!.innerHTML;
      this.loadAll();
      this.registerChangeInMessages();
    }
    return flagTest;
  }

  getFlag(): void {
    this.flag = false;
    this.messageService.getMessageFlag().subscribe(data => (this.flag = this.setFlag(data)));
    // eslint-disable-next-line no-console
    //console.log("flagTest = "+ flagTest);
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
    this.messageService.create(new Message($event.message, this.userLogin, true, new Date())).subscribe((res: HttpResponse<IMessage>) => {
      if (res.body) {
        this.messages.push(res.body);
      }
    });
  }
}
