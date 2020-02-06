import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IContactEtInformation } from 'app/shared/model/contact-et-information.model';
import { ContactEtInformationService } from './contact-et-information.service';

@Component({
  selector: 'jhi-contact-et-information',
  templateUrl: './contact-et-information.component.html'
})
export class ContactEtInformationComponent implements OnInit, OnDestroy {
  contactEtInformations?: IContactEtInformation[];
  eventSubscriber?: Subscription;

  constructor(protected contactEtInformationService: ContactEtInformationService, protected eventManager: JhiEventManager) {}

  loadAll(): void {
    this.contactEtInformationService.query().subscribe((res: HttpResponse<IContactEtInformation[]>) => {
      this.contactEtInformations = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContactEtInformations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContactEtInformation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContactEtInformations(): void {
    this.eventSubscriber = this.eventManager.subscribe('contactEtInformationListModification', () => this.loadAll());
  }
}
