import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IDrive } from 'app/shared/model/drive.model';
import { DriveService } from './drive.service';

@Component({
  selector: 'jhi-drive',
  templateUrl: './drive.component.html'
})
export class DriveComponent implements OnInit, OnDestroy {
  drives?: IDrive[];
  eventSubscriber?: Subscription;

  constructor(protected driveService: DriveService, protected eventManager: JhiEventManager) {}

  loadAll(): void {
    this.driveService.query().subscribe((res: HttpResponse<IDrive[]>) => {
      this.drives = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDrives();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDrive): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDrives(): void {
    this.eventSubscriber = this.eventManager.subscribe('driveListModification', () => this.loadAll());
  }
}
