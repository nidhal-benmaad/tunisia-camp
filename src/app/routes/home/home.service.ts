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
export class HomeService {
  private apiUrl = 'http://localhost:8082/tunisia-camp/campgroundRest/findAllCampgrouds';

  constructor(private http: HttpClient) {}

  getCampingList() {
    return this.http.get(this.apiUrl);
  }
}
