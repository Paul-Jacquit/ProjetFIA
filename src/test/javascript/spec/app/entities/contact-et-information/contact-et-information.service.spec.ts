import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { ContactEtInformationService } from 'app/entities/contact-et-information/contact-et-information.service';
import { IContactEtInformation, ContactEtInformation } from 'app/shared/model/contact-et-information.model';

describe('Service Tests', () => {
  describe('ContactEtInformation Service', () => {
    let injector: TestBed;
    let service: ContactEtInformationService;
    let httpMock: HttpTestingController;
    let elemDefault: IContactEtInformation;
    let expectedResult: IContactEtInformation | IContactEtInformation[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ContactEtInformationService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ContactEtInformation(0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of ContactEtInformation', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
