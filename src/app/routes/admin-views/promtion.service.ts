import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from "../../model/Product";
import {Promotion} from "../../model/Promotion";

export interface RepoSearchList {
  content: any[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})

export class PromtionService {
  private apiUrl = 'http://localhost:2022/tunisia-camp';

  constructor(private http: HttpClient) { }

  createPromotion(data: Promotion | undefined) {
    return this.http.post<Promotion>('http://localhost:2022/tunisia-camp/promotion/createPromo',data);
  }

  getAllPromotions(params: any): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('http://localhost:2022/tunisia-camp/promotion/getPromotionByPage', { params });
  }
  deletePromo(id: number) {
    const url = `http://localhost:2022/tunisia-camp/promotion/${id}/deletePromotion/`;
    return this.http.delete(url);

  }

  getPromotion(id: number | undefined) {
    return this.http.get<Promotion>('`http://localhost:2022/tunisia-camp/promotion/promotion/' + id);
  }

  private url = `http://localhost:2022/tunisia-camp/promotion`;
  updatePromotion(data: any) {

    return this.http.put(`${this.url}/update/`, data);
  }


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  retourProductPromo(promotionId: number , productId: number): Observable<Product> {
    const params = new HttpParams()
      .set('promotionId', promotionId.toString())
      .set('productId', productId.toString());

    return this.http.put<Product>(`${this.apiUrl}/promotion/AffecterPromoToProductRetourProductPromo`, null, { params });
  }
  removeProductFromPromotion(promotionId: number, productId: number) {
    const url = `${this.apiUrl}/promotion/${promotionId}/products/${productId}/removeProductFromPromotion`;
    return this.http.delete(url);
  }

  getPromotionsByDates(startDate: string, endDate: string) {
    const url = `http://localhost:2022/tunisia-camp/promotion/ListPromoByDate?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Promotion[]>(url);
  }
}
