import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ProjetFiaSharedModule,
    RouterModule.forChild([HOME_ROUTE]),
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule
  ],
  declarations: [HomeComponent]
})
export class ProjetFiaHomeModule {}
