import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContactEtInformation } from 'app/shared/model/contact-et-information.model';

type EntityResponseType = HttpResponse<IContactEtInformation>;
type EntityArrayResponseType = HttpResponse<IContactEtInformation[]>;

@Injectable({ providedIn: 'root' })
export class ContactEtInformationService {
  public resourceUrl = SERVER_API_URL + 'api/contact-et-informations';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactEtInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactEtInformation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
