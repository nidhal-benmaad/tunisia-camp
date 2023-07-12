import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../model/Product";
import {HttpClient} from "@angular/common/http";
import {ProductDTO} from "../../../model/ProductDTO";
import {Payment} from "../../../model/Payment";
import {Promotion} from "../../../model/Promotion";

@Injectable({
  providedIn: 'root'
})
export class ProductFrontServiceService {
  private apiUrl = 'http://localhost:2022/tunisia-camp/product/products/after-promotion';
  private baseUrl = 'http://localhost:2022/tunisia-camp/orderDetails';
  private PaymentUrl= 'http://localhost:2022/tunisia-camp/payments/';
  private apiUrl2 = 'http://localhost:2022/tunisia-camp/product'

  constructor(private http: HttpClient) { }
  private cartItems: any[] = [];

  clearCart() {
    this.cartItems = [];
  }

  getProductsWithImages(): Observable<ProductDTO[]> {
    const url = `${this.apiUrl}/productsWithImage`;
    return this.http.get<ProductDTO[]>(url);
  }


  getProductById(productId: number): Observable<ProductDTO> {
    const url = `${this.apiUrl2}/productsWithImage/${productId}`;
    return this.http.get<ProductDTO>(url);
  }

  addToCart(productId: number, quantity: number, userId: number) {
    const url = `${this.baseUrl}/add-to-cart/${productId}?quantity=${quantity}&userId=1`;
    return this.http.post(url, null);
  }

  createPayment(data: Payment | undefined) {
    return this.http.post<Payment>('http://localhost:2022/tunisia-camp/payments/createPayment',data);
  }


  getProductsAfterPromotion(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.apiUrl);
  }



  getProductsByCategoryWithImage(categoryName: string): Observable<ProductDTO[]> {
    const url = `${this.baseUrl}/product/productsWithImageCategory/${categoryName}`;
    return this.http.get<ProductDTO[]>(url);
  }

}
