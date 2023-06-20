import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from "../../model/Product";
import {Promotion} from "../../model/Promotion";



@Injectable({
  providedIn: 'root'
})

export class PromtionService {
  private apiUrl = 'http://localhost:2022/tunisia-camp';

  constructor(private http: HttpClient) { }

  createPromotion(data: Promotion | undefined) {
    return this.http.post<Promotion>('http://localhost:2022/tunisia-camp/promotion/createPromo',data);
  }

  getAllPromotions() {
    return this.http.get('http://localhost:2022/tunisia-camp/promotion/listPromo');

  }

  deletePromo(id: number) {
    const url = `http://localhost:2022/tunisia-camp/promotion/${id}/deletePromotion/`;
    return this.http.delete(url);

  }

  getPromotion(id: number | undefined) {
    return this.http.get<Promotion>('`http://localhost:2022/tunisia-camp/promotion/promotion/' + id);
  }

  updatePromotion(promotionId: number | undefined, updatedPromotion: Promotion): Observable<Promotion> {
    const url = `http://localhost:2022/tunisia-camp/promotion/${promotionId}/updatePromotion`;
    return this.http.put<Promotion>(url, updatedPromotion);
  }


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  retourProductPromo(promotionId: number , productId: number): Observable<Product> {
    const params = new HttpParams()
      .set('promotionId', promotionId.toString())
      .set('productId', productId.toString());

    return this.http.put<Product>(`${this.apiUrl}/promotion/AffecterPromoToProductRetourProductPromo`, null, { params });
  }

}
