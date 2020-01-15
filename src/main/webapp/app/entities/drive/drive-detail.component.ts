import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDrive } from 'app/shared/model/drive.model';

@Component({
  selector: 'jhi-drive-detail',
  templateUrl: './drive-detail.component.html'
})
export class DriveDetailComponent implements OnInit {
  drive: IDrive | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ drive }) => {
      this.drive = drive;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
