import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactEtInformation } from 'app/shared/model/contact-et-information.model';

@Component({
  selector: 'jhi-contact-et-information-detail',
  templateUrl: './contact-et-information-detail.component.html'
})
export class ContactEtInformationDetailComponent implements OnInit {
  contactEtInformation: IContactEtInformation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactEtInformation }) => {
      this.contactEtInformation = contactEtInformation;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
