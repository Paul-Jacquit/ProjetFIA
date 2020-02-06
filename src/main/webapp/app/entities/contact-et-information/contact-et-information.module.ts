import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { ContactEtInformationComponent } from './contact-et-information.component';
import { ContactEtInformationDetailComponent } from './contact-et-information-detail.component';
import { contactEtInformationRoute } from './contact-et-information.route';
import { ProjetFiaContactModule } from 'app/entities/contact/contact.module';
import { ProjetFiaInformationModule } from 'app/entities/information/information.module';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(contactEtInformationRoute), ProjetFiaContactModule, ProjetFiaInformationModule],
  declarations: [ContactEtInformationComponent, ContactEtInformationDetailComponent],
  entryComponents: []
})
export class ProjetFiaContactEtInformationModule {}
