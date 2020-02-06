import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { Menu_RuComponent } from './menu-ru.component';
import { menu_RuRoute } from './menu-ru.route';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(menu_RuRoute)],
  declarations: [Menu_RuComponent]
})
export class ProjetFiaMenu_RuModule {}
