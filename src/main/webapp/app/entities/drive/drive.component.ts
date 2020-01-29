import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { FileUploader } from 'ng2-file-upload';

import { IDrive } from 'app/shared/model/drive.model';
import { DriveService } from './drive.service';
import { AccountService } from 'app/core/auth/account.service';

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

  role = 'DEFAULT';
  idURLDrive = '16NY44_FHwg9IWxonbeVKVTgvX-wU3nJd';
  baseURLDrive = 'https://drive.google.com/embeddedfolderview?id=';
  URLsuivantRole = 'https://drive.google.com/embeddedfolderview?id=16NY44_FHwg9IWxonbeVKVTgvX-wU3nJd#grid';
  progression = 0;

  constructor(protected driveService: DriveService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  setRoleAndURL(): void {
    if (this.accountService.hasAnyAuthority('ROLE_ADMIN')) {
      this.role = 'ROLE_ADMIN';
      this.URLsuivantRole = 'https://drive.google.com/embeddedfolderview?id=16NY44_FHwg9IWxonbeVKVTgvX-wU3nJd#grid';
    }
    if (this.accountService.hasAnyAuthority('ROLE_M2')) {
      this.role = 'ROLE_M2';
      this.URLsuivantRole = 'https://drive.google.com/embeddedfolderview?id=16rXd2RePECfrAA7H8U2YyPHj911t5Obn#grid';
    }
    if (this.accountService.hasAnyAuthority('ROLE_M1')) {
      this.role = 'ROLE_M1';
      this.URLsuivantRole = 'https://drive.google.com/embeddedfolderview?id=10fHbV8sIOeSI7PD7_DmgwgooRPvECewA#grid';
    }
    if (this.accountService.hasAnyAuthority('ROLE_L3')) {
      this.role = 'ROLE_L3';
      this.URLsuivantRole = 'https://drive.google.com/embeddedfolderview?id=13BovpYwztmQWQDlVU04o-Zl51GngiIor#grid';
    }
    this.URLsuivantRole = this.baseURLDrive + this.idURLDrive + '#grid';
  }

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
    this.setRoleAndURL();
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
    this.progression = 1;
    this.driveService.sendFormData(this.file, this.role.toString()).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          /* TODO ajouter barre de progression en attendant reponse */
          this.progression = 100;
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
