import {Component, OnInit} from '@angular/core';
import {PromtionService} from "../promtion.service";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent   implements OnInit {
  category: any;

  constructor(private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.findAllCategory();

  }

  findAllCategory(): void {
    this.categorieService.findAllCategory().subscribe((category) => {
        this.category = category;
      },
      (error: any) => {
        console.error('Error fetching promotions:', error);
      }
    );

  }

  deleteCatego(id: number): void {
    this.categorieService.deleteCatego(id).subscribe(() => {
      this.findAllCategory();
    });
  }
}
