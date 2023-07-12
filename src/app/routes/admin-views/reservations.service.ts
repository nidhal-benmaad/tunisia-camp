import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReservation } from '@shared';
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
  getByUserId(params: any) {
    return this.http.get(`${this.apiUrl}/byUserId`, { params });
  }
  addReservation(payload: any): Observable<IReservation> {
    return this.http.post<IReservation>(`${this.apiUrl}/create`, payload);
  }
  deleteReservation(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteCId/${id}`);
  }
  updateReservation(data: any) {
    return this.http.put(`${this.apiUrl}/update/`, data);
  }
}
