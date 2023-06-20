import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/Category";
import {CategorieService} from "../categorie.service";
import {Promotion} from "../../../model/Promotion";

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.scss']
})
export class AjoutCategorieComponent implements OnInit {
  category: Category = new Category();
  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {}
  savedata(): void {
    this.categorieService.createCategory(this.category).subscribe(
      () => {
        alert('Category created successfully.');
        this.resetForm();
      },
      (error: any) => {
        console.error(error);
        // Handle the error here
      }
    );
  }

  resetForm(): void {
    this.category = new Category();
  }
}
