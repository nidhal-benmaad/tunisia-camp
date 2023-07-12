import {Component, Inject, OnInit} from '@angular/core';
import {Promotion} from "../../../model/Promotion";
import {ActivatedRoute, Router} from "@angular/router";
import {PromtionService} from "../promtion.service";
import {Product} from "../../../model/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-update-promo',
  templateUrl: './update-promo.component.html',
  styleUrls: ['./update-promo.component.scss']
})
export class UpdatePromoComponent implements OnInit{


  formGroup!: FormGroup;
  private promotionId: number | undefined;
  promotion:Promotion = new Promotion();
    constructor(
    public dialogRef: MatDialogRef<UpdatePromoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private promotionservice: PromtionService
  ) {}
  ngOnInit(): void {
    console.log('this.data', this.data);
    this.formGroup = this.formBuilder.group({
      code: [this.data.record.code, Validators.required],
      discount: [this.data.record.discount, Validators.required],
      startDate: [this.data.record.startDate, Validators.required],
      endDate: [this.data.record.endDate, Validators.required],
    });
  }

  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  update() {
    console.log('update');
    const promotionvalues = this.formGroup.value;
    const data = {
      ...this.data.record,
      ...promotionvalues,
    };
    this.promotionservice.updatePromotion(data).subscribe(() => {
      this.promotionservice.getAllPromotions({ page: 0, size: 3 }).subscribe(() => {
        this.onClose();
      });
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }
  getPromotion() {
    this.promotionservice.getPromotion(this.promotionId).subscribe(
      (promotion: Promotion) => {
        this.promotion = promotion;
      },
      (error: any) => {
        console.error('Error retrieving promotion:', error);
      }
    );
  }


}
