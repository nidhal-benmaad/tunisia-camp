import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/tunisia-camp/api'; // Remplacez cette URL par l'URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/addUser`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/updateUser`, user);
  }

  deleteUser(user: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/deleteUser`, { body: user });
  }
  getPendingUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/pending`);

  }
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/getUserByEmail/${email}`);
  }

  validateUser(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/validate/${userId}`, {});
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/deleteCId/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/allUsers`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/getUser?id=${id}`);
  }
}
