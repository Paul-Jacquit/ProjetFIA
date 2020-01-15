import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDrive } from 'app/shared/model/drive.model';

type EntityResponseType = HttpResponse<IDrive>;
type EntityArrayResponseType = HttpResponse<IDrive[]>;

@Injectable({ providedIn: 'root' })
export class DriveService {
  public resourceUrl = SERVER_API_URL + 'api/drives';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDrive>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDrive[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
