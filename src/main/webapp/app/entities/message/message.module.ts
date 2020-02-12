import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { MessageComponent } from './message.component';
import { messageRoute } from './message.route';
import { NbChatModule, NbSidebarModule } from '@nebular/theme';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(messageRoute), NbChatModule, NbSidebarModule, MatRadioModule],
  declarations: [MessageComponent]
})
export class ProjetFiaMessageModule {}
