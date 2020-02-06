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
      },
      {
        path: 'menu-ru',
        loadChildren: () => import('./menu-ru/menu-ru.module').then(m => m.ProjetFiaMenu_RuModule)
      }
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
