import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMessage, Message } from 'app/shared/model/message.model';
import { MessageService } from './message.service';
import { MessageDeleteDialogComponent } from './message-delete-dialog.component';

@Component({
  selector: 'jhi-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
  messages?: IMessage[];
  eventSubscriber?: Subscription;

  constructor(protected messageService: MessageService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.messageService.query().subscribe((res: HttpResponse<IMessage[]>) => {
      this.messages = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMessages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerChangeInMessages(): void {
    this.eventSubscriber = this.eventManager.subscribe('messageListModification', () => this.loadAll());
  }

  delete(message: IMessage): void {
    const modalRef = this.modalService.open(MessageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.message = message;
  }

  sendMessage($event: { message: string; files: File[] }): void {
    this.messageService.create(new Message($event.message, 'Paul', false, new Date(), 'text'));
  }
}
