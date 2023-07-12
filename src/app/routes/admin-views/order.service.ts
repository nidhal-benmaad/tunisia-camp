import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RepoSearchList} from "./product.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  findAllOrder(params: any): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('http://localhost:2022/tunisia-camp/order/getOrderByPage', { params });
  }
  deleteOrder(id:number) {
    const url = `http://localhost:2022/tunisia-camp/order/deleteCId/${id}`;
    return this.http.delete(url);
  }
}
