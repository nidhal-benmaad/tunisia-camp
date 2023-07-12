import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/Category";
import {Promotion} from "../../model/Promotion";
import {Product} from "../../model/Product";
import {RepoSearchList} from "./promtion.service";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  findAllCategory(params: any): Observable<RepoSearchList>{
    return this.http.get<RepoSearchList>('http://localhost:2022/tunisia-camp/Category/getCategoryByPage', { params });
  }



  createCategory(data: Category | undefined) {
    return this.http.post<Category>('http://localhost:2022/tunisia-camp/Category/create',data);
  }

  deleteCatego(id: number) {
    const url = `http://localhost:2022/tunisia-camp/Category/deleteCId/${id}`;
    return this.http.delete(url);
  }

  getCategoryById(categoryId: number | undefined) {
    return this.http.get<Promotion>('`http://localhost:2022/tunisia-camp/Category/Categorie/' + categoryId);
  }

  /*updateCategorie(categorieId: number | undefined, updateCategorie: Product): Observable<Product>{
    const url = `http://localhost:2022/tunisia-camp/Category/${categorieId}/update`;
    return this.http.put<Category>(url, updateCategorie);
  }*/
  private url = `http://localhost:2022/tunisia-camp/Category`;

  updateCategory(data: any) {
    return this.http.put(`${this.url}/update/`, data);

  }

}
