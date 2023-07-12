import {Component, Inject, OnInit} from '@angular/core';
import {Category} from "../../../model/Category";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../model/Product";
import {CategorieService} from "../categorie.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromtionService} from "../promtion.service";
import {Promotion} from "../../../model/Promotion";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent  {
  formGroup!: FormGroup;

  category: Category = new Category();
  categoryId: number | undefined;
  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {

    console.log('this.data', this.data);
    this.formGroup = this.formBuilder.group({
      description: [this.data.record.description, Validators.required],
      name: [this.data.record.name, Validators.required],

    });
  }

  update() {
    console.log('update');
    const categoryValues = this.formGroup.value;
    const data = {
      ...this.data.record,
      ...categoryValues,
    };
    this.categorieService.updateCategory(data).subscribe(() => {
      this.categorieService.findAllCategory({ page: 0, size: 3 }).subscribe(() => {
        this.onClose();
      });
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
