import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from './information.service';
import { InformationDeleteDialogComponent } from './information-delete-dialog.component';

@Component({
  selector: 'jhi-information',
  templateUrl: './information.component.html'
})
export class InformationComponent implements OnInit, OnDestroy {
  information?: IInformation[];
  eventSubscriber?: Subscription;
  channel: string;

  constructor(protected informationService: InformationService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {
    this.channel = 'G';
  }

  loadAll(): void {
    this.informationService.query({ 'channel.equals': this.channel }).subscribe((res: HttpResponse<IInformation[]>) => {
      this.information = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInformation();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInformation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInformation(): void {
    this.eventSubscriber = this.eventManager.subscribe('informationListModification', () => this.loadAll());
  }

  delete(information: IInformation): void {
    const modalRef = this.modalService.open(InformationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.information = information;
  }

  setChannel($event: any): void {
    this.channel = $event.target.value;
    this.loadAll();
  }
}
