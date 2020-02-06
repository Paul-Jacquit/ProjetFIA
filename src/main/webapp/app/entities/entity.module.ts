import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'menu-ru',
        loadChildren: () => import('./menu-ru/menu-ru.module').then(m => m.ProjetFiaMenu_RuModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProjetFiaEntityModule {}
