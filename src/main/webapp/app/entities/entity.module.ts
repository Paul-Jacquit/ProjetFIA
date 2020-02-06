import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ProjetFiaContactModule)
      },
      {
        path: 'information',
        loadChildren: () => import('./information/information.module').then(m => m.ProjetFiaInformationModule)
      },
      {
        path: 'contact-et-information',
        loadChildren: () =>
          import('./contact-et-information/contact-et-information.module').then(m => m.ProjetFiaContactEtInformationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProjetFiaEntityModule {}
