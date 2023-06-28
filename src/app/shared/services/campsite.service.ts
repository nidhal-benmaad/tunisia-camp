import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageableList } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class campsiteService {
  private apiUrl = 'http://localhost:8082/tunisia-camp/CampsiteRest/';

  constructor(private http: HttpClient) {}

  getCampsiteList(params: any): Observable<PageableList> {
    return this.http.get<PageableList>(this.apiUrl + 'findCampsitesByCampground', { params });
  }
  getCampsitesByDates(params: any): Observable<PageableList> {
    return this.http.get<PageableList>(this.apiUrl + 'findCampsitesByDates', { params });
  }
}
