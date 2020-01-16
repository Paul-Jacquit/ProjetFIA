import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbChatModule } from '@nebular/theme';

@NgModule({
  imports: [
    ProjetFiaSharedModule,
    RouterModule.forChild([HOME_ROUTE]),
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbChatModule.forRoot({ messageGoogleMapKey: 'AIzaSyALuzK4j-e9vQtdK_xb3zBR228vThCFGkc' })
  ],
  declarations: [HomeComponent]
})
export class ProjetFiaHomeModule {}
