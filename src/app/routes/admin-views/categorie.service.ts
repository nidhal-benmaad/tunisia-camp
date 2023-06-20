import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/Category";
import {Promotion} from "../../model/Promotion";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  findAllCategory():Observable<any>{
    return this.http.get('http://localhost:2022/tunisia-camp/Category/Categorie');
  }

  createCategory(data: Category | undefined) {
    return this.http.post<Category>('http://localhost:2022/tunisia-camp/Category/create',data);
  }

  deleteCatego(id: number) {
    const url = `http://localhost:2022/tunisia-camp/Category/deleteCId/${id}`;
    return this.http.delete(url);
  }

  getCategoryById(id: number | undefined) {
    return this.http.get<Promotion>('`http://localhost:2022/tunisia-camp/Category/Categorie/' + id);
  }
}
