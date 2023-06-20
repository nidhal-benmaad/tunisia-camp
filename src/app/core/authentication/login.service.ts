import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu } from '@core';
//import {map,tap} from 'rxjs/operators';
import { catchError, map , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}
  private endpoint = 'http://localhost:8082/tunisia-camp/api';


  login(email: string, password: string, rememberMe = false) {
    return this.http.post<any>(`${this.endpoint}/auth/authenticate`, { email, password })
      .pipe(
        catchError(error => {
          // Gérez les erreurs ici, comme les erreurs réseau, etc.
          throw error;
        })
      );
  }


  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    const user: User = {
      id: 1,
      name: 'Zongbin',
      email: 'nzb329@163.com',
      avatar: './assets/images/avatar.jpg',
    }
    return  user;
  }

  menu() {
    return [];
  }
}
