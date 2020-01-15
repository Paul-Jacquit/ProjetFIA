import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetFiaTestModule } from '../../../test.module';
import { DriveDetailComponent } from 'app/entities/drive/drive-detail.component';
import { Drive } from 'app/shared/model/drive.model';

describe('Component Tests', () => {
  describe('Drive Management Detail Component', () => {
    let comp: DriveDetailComponent;
    let fixture: ComponentFixture<DriveDetailComponent>;
    const route = ({ data: of({ drive: new Drive(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetFiaTestModule],
        declarations: [DriveDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DriveDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DriveDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load drive on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.drive).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
