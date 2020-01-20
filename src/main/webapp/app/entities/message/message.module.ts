import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { MessageComponent } from './message.component';
import { MessageDetailComponent } from './message-detail.component';
import { MessageUpdateComponent } from './message-update.component';
import { MessageDeleteDialogComponent } from './message-delete-dialog.component';
import { messageRoute } from './message.route';
import { NbChatModule } from '@nebular/theme';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(messageRoute), NbChatModule],
  declarations: [MessageComponent, MessageDetailComponent, MessageUpdateComponent, MessageDeleteDialogComponent],
  entryComponents: [MessageDeleteDialogComponent]
})
export class ProjetFiaMessageModule {}
