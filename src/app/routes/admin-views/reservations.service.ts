import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface RepoSearchList {
  content: any[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8082/tunisia-camp/reservations';

  constructor(private http: HttpClient) {}

  getList(params: any): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>(this.apiUrl, { params });
  }
}
