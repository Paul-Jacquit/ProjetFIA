import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { DriveComponent } from './drive.component';
import { DriveDetailComponent } from './drive-detail.component';
import { driveRoute } from './drive.route';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(driveRoute), FileUploadModule],
  declarations: [DriveComponent, DriveDetailComponent],
  entryComponents: []
})
export class ProjetFiaDriveModule {}
