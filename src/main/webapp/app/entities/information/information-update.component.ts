import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInformation, Information } from 'app/shared/model/information.model';
import { InformationService } from './information.service';

@Component({
  selector: 'jhi-information-update',
  templateUrl: './information-update.component.html'
})
export class InformationUpdateComponent implements OnInit {
  isSaving = false;
  channel?: string;

  editForm = this.fb.group({
    id: [],
    titre: [],
    description: []
  });

  constructor(protected informationService: InformationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ information }) => {
      this.updateForm(information);
      this.channel = information.get('channel');
    });
    this.activatedRoute.paramMap.subscribe(param => {
      this.channel = param.get('channel')!;
    });
  }

  updateForm(information: IInformation): void {
    this.editForm.patchValue({
      id: information.id,
      titre: information.titre,
      description: information.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const information = this.createFromForm();
    if (information.id !== undefined) {
      this.subscribeToSaveResponse(this.informationService.update(information));
    } else {
      this.subscribeToSaveResponse(this.informationService.create(information));
    }
  }

  private createFromForm(): IInformation {
    return {
      ...new Information(),
      id: this.editForm.get(['id'])!.value,
      titre: this.editForm.get(['titre'])!.value,
      description: this.editForm.get(['description'])!.value,
      channel: this.channel
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInformation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
