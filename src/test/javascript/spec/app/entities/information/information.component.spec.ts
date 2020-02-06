import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetFiaTestModule } from '../../../test.module';
import { InformationComponent } from 'app/entities/information/information.component';
import { InformationService } from 'app/entities/information/information.service';
import { Information } from 'app/shared/model/information.model';

describe('Component Tests', () => {
  describe('Information Management Component', () => {
    let comp: InformationComponent;
    let fixture: ComponentFixture<InformationComponent>;
    let service: InformationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetFiaTestModule],
        declarations: [InformationComponent],
        providers: []
      })
        .overrideTemplate(InformationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InformationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InformationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Information(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.information && comp.information[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
