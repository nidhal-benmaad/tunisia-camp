import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDetails} from "../../../model/OrderDetails";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsServiceService {


  private apiUrl = 'http://localhost:2022/tunisia-camp/order';
  private apiUrl2 = 'http://localhost:2022/tunisia-camp/orderDetails';

  constructor(private http: HttpClient) {}

  getOrdersByUser(userId: number): Observable<OrderDetails[]> {
    const url = `${this.apiUrl}/${userId}/orders`;
    return this.http.get<OrderDetails[]>(url);
  }

  deleteOrderDetails(orderId: number): Observable<any> {
    const url = `${this.apiUrl2}/deleteCId/${orderId}`;
    return this.http.delete(url);
  }
}
