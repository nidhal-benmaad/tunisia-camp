import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RepoSearchList} from "./product.service";
import {Product} from "../../model/Product";
import {OrderDetail} from "../../model/OrderDetails";

@Injectable({
  providedIn: 'root'
})
export class ListOrderDetailsAdminService {

  constructor(private http: HttpClient) { }


  findAllOrderDetails(params: any): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('http://localhost:2022/tunisia-camp/orderDetails/getOrderDetailsByPage', { params });
  }

  deleteOrderDetails(id: number) {
    const url = `http://localhost:2022/tunisia-camp/Category/deleteCId/${id}`;
    return this.http.delete(url);

  }

  private apiUrl = 'http://localhost:2022/tunisia-camp/orderDetails';
  EditOrderDetails(data: any) {
    return this.http.put(`${this.apiUrl}/update/`, data);
  }

}
