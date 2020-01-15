import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'drive',
        loadChildren: () => import('./drive/drive.module').then(m => m.ProjetFiaDriveModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProjetFiaEntityModule {}
