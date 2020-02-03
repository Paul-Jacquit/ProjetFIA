import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';

// type EntityResponseType = HttpResponse<IDrive>;
// type EntityArrayResponseType = HttpResponse<IDrive[]>;

@Injectable({ providedIn: 'root' })
export class DriveService {
  public resourceUrl = SERVER_API_URL + 'api/drives';

  constructor(protected http: HttpClient) {}

  // find(id: number): Observable<EntityResponseType> {
  //   return this.http.get<IDrive>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  // }
  //
  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http.get<IDrive[]>(this.resourceUrl, { params: options, observe: 'response' });
  // }

  public sendFormData(file: any, role: string): Observable<any> {
    const formData = new FormData();
    const options = createRequestOption(file);
    formData.append('file', file, file.name);
    formData.append('role', role);
    file = formData.get('file');
    alert('file name is :' + file.name);
    alert('sending to ' + this.resourceUrl);
    return this.http.post(this.resourceUrl, formData, {
      params: options,
      observe: 'response',
      withCredentials: true,
      reportProgress: true
    });
  }

  postFile(file: any): Observable<File> {
    const options = createRequestOption(file);
    return this.http.post<File>(this.resourceUrl, { params: options, observe: 'response' });
  }
  /*
  getAllFiles(): Observable<EntityResponseType>{
    return this.http.get<FileList>(this.resourceUrl, {observe: 'response'});
  }
 */
}
