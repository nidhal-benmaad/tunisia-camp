import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8082/tunisia-camp/api/findAllCampgrouds';

  constructor(private http: HttpClient) {}

  getCampingList(headers: HttpHeaders) {
    console.log("headers: -------->", headers)
    const httpOptions = {
      headers
    };
    return this.http.get<any>(this.apiUrl);
  }
}
