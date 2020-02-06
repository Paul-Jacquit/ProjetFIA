import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetFiaTestModule } from '../../../test.module';
import { ContactEtInformationComponent } from 'app/entities/contact-et-information/contact-et-information.component';
import { ContactEtInformationService } from 'app/entities/contact-et-information/contact-et-information.service';
import { ContactEtInformation } from 'app/shared/model/contact-et-information.model';

describe('Component Tests', () => {
  describe('ContactEtInformation Management Component', () => {
    let comp: ContactEtInformationComponent;
    let fixture: ComponentFixture<ContactEtInformationComponent>;
    let service: ContactEtInformationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetFiaTestModule],
        declarations: [ContactEtInformationComponent],
        providers: []
      })
        .overrideTemplate(ContactEtInformationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactEtInformationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactEtInformationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContactEtInformation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contactEtInformations && comp.contactEtInformations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
