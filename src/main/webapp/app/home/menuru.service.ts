import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class MenuruService {
  constructor(private http: HttpClient) {}

  public resourceUrl = SERVER_API_URL + 'api/get-menu-ru/get-menu-gouv-url';

  public getXMLMenuFile(): Observable<any> {
    return this.http.get(this.resourceUrl, { responseType: 'text' });
    //{ params: options, observe: 'response' });
  }
}
