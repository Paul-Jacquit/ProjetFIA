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
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProjetFiaEntityModule {}
