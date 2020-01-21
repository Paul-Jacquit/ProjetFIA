import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { FileUploader } from 'ng2-file-upload';

import { IDrive } from 'app/shared/model/drive.model';
import { DriveService } from './drive.service';

@Component({
  selector: 'jhi-drive',
  templateUrl: './drive.component.html'
})
export class DriveComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', { static: true })
  native?: any;

  drives?: IDrive[];
  eventSubscriber?: Subscription;

  uploader?: FileUploader;

  file?: File | null;

  progress?: number = 0;

  constructor(protected driveService: DriveService, protected eventManager: JhiEventManager) {}

  loadAll(): void {
    this.driveService.query().subscribe((res: HttpResponse<IDrive[]>) => {
      this.drives = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDrives();

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploader = new FileUploader({ url: 'api/drives', autoUpload: true, headers });

    this.uploader.onCompleteAll = () => alert('File uploaded');
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  sendFile(file: FileList): void {
    this.file = file.item(0);
  }

  sendFileByService(): void {
    this.driveService.sendFormData(this.file).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          alert('Upload successfully done!');
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
        }
        window.location.reload();
      },
      error => {
        alert("Erreur lors de l'envoi du fichier : " + error);
      }
    );
  }

  trackId(index: number, item: IDrive): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDrives(): void {
    this.eventSubscriber = this.eventManager.subscribe('driveListModification', () => this.loadAll());
  }
}
