import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetFiaTestModule } from '../../../test.module';
import { ContactEtInformationDetailComponent } from 'app/entities/contact-et-information/contact-et-information-detail.component';
import { ContactEtInformation } from 'app/shared/model/contact-et-information.model';

describe('Component Tests', () => {
  describe('ContactEtInformation Management Detail Component', () => {
    let comp: ContactEtInformationDetailComponent;
    let fixture: ComponentFixture<ContactEtInformationDetailComponent>;
    const route = ({ data: of({ contactEtInformation: new ContactEtInformation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetFiaTestModule],
        declarations: [ContactEtInformationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContactEtInformationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactEtInformationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contactEtInformation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactEtInformation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
