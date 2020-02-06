import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class Menu_RuService {
  public resourceUrl = SERVER_API_URL + 'api/menu-ru';

  constructor(protected http: HttpClient) {}

  public getXMLMenuFile(): Observable<any> {
    return this.http.get(this.resourceUrl, { responseType: 'text' });
  }
}
