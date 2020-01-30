import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { DriveComponent } from './drive.component';
import { driveRoute } from './drive.route';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(driveRoute), FileUploadModule, MatProgressBarModule],
  declarations: [DriveComponent],
  entryComponents: []
})
export class ProjetFiaDriveModule {}
