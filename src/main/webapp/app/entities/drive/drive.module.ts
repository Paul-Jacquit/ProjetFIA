import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetFiaSharedModule } from 'app/shared/shared.module';
import { DriveComponent } from './drive.component';
import { DriveDetailComponent } from './drive-detail.component';
import { driveRoute } from './drive.route';

@NgModule({
  imports: [ProjetFiaSharedModule, RouterModule.forChild(driveRoute)],
  declarations: [DriveComponent, DriveDetailComponent],
  entryComponents: []
})
export class ProjetFiaDriveModule {}
