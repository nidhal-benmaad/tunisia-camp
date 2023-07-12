import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ProductService} from "../../product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-kitchen-sink-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditProductComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.formGroup = this.formBuilder.group({
      name: [this.data.record.name, Validators.required],
      description: [this.data.record.description, Validators.required],
      price: [this.data.record.price, Validators.required],
      quantity: [this.data.record.quantity, Validators.required]
    });
  }
  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }
  update() {
    console.log('update');
    const productValues = this.formGroup.value;
    const data = {
      ...this.data.record,
      ...productValues,
    };
    this.productService.EditProduct(data).subscribe(() => {
      this.productService.findAllProducts({ page: 0, size: 3 }).subscribe(() => {
        this.onClose();
      });
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
