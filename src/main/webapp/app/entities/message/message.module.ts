import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { MessageComponent } from './message.component';
import { messageRoute } from './message.route';
import { NbChatModule } from '@nebular/theme';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(messageRoute), NbChatModule],
  declarations: [MessageComponent]
})
export class ProjetFiaMessageModule {}
