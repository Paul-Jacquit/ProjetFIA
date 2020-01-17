import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { NbChatModule } from '@nebular/theme';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild([HOME_ROUTE]), NbChatModule],
  declarations: [HomeComponent]
})
export class ProjetFiaHomeModule {}
