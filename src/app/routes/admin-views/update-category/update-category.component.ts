import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/Category";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../model/Product";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent  {
  category: Category = new Category();
  categoryId: number | undefined;
  constructor(
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

 /* ngOnInit(): void {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.getCategoryById();
  }*/

  /*private getCategoryById() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.categorieService.getCategoryById(this.CategoryId).subscribe(
      (category: Category) => {
        this.category = category;
      },
      (error: any) => {
        console.error('Error retrieving promotion:', error);
      }
    );
  }*/
}
