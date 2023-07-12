import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/Product';
import {Observable} from "rxjs";
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
export class ProductService {
  private products: any[] = [];

  getProducts(): any[] {
    return this.products;
  }

  setProducts(products: any[]): void {
    this.products = products;
  }
  constructor(private http: HttpClient) { }
  findAllProducts(params: any):Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('http://localhost:2022/tunisia-camp/product/getProductByPage', { params });
  }


  addProduct(data: Product | undefined) {
    return this.http.post<Product>('http://localhost:2022/tunisia-camp/product/create',data);
  }

  getProductById(id: number | undefined) {
    return this.http.get<Product>('http://localhost:2022/tunisia-camp/product/products/' + id);
  }
  updateProduct(productId: number | undefined, updateProduct: Product): Observable<Product>{
    const url = `http://localhost:2022/tunisia-camp/product/${productId}/update`;
    return this.http.put<Product>(url, updateProduct);
  }


  deleteProduct(id: number) {
    const url = `http://localhost:2022/tunisia-camp/product/deleteCId/${id}`;
    return this.http.delete(url);
  }
  private apiUrl = 'http://localhost:2022/tunisia-camp/product';
  private apiUrl2 = 'http://localhost:2022/tunisia-camp';

  EditProduct(data: any) {
    return this.http.put(`${this.apiUrl}/update/`, data);
  }



}


