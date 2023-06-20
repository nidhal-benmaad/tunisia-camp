import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/Product';
import {Observable} from "rxjs";
import {Promotion} from "../../model/Promotion";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  findAllProduct():Observable<any> {
    return this.http.get('http://localhost:2022/tunisia-camp/product/products');
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



}


