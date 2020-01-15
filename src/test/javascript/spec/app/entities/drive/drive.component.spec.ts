import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetFiaTestModule } from '../../../test.module';
import { DriveComponent } from 'app/entities/drive/drive.component';
import { DriveService } from 'app/entities/drive/drive.service';
import { Drive } from 'app/shared/model/drive.model';

describe('Component Tests', () => {
  describe('Drive Management Component', () => {
    let comp: DriveComponent;
    let fixture: ComponentFixture<DriveComponent>;
    let service: DriveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetFiaTestModule],
        declarations: [DriveComponent],
        providers: []
      })
        .overrideTemplate(DriveComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DriveComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DriveService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Drive(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.drives && comp.drives[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
