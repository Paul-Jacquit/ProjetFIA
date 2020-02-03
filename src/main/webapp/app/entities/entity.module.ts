import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.ProjetFiaCalendarModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./message/message.module').then(m => m.ProjetFiaMessageModule)
      },
      {
        path: 'drive',
        loadChildren: () => import('./drive/drive.module').then(m => m.ProjetFiaDriveModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProjetFiaEntityModule {}
