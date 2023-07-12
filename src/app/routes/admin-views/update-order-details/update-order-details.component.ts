import {Component, Inject, OnInit} from '@angular/core';
import {Promotion} from "../../../model/Promotion";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromtionService} from "../promtion.service";
import {ListOrderDetailsAdminService} from "../list-order-details-admin.service";
import {OrderDetail} from "../../../model/OrderDetails";

@Component({
  selector: 'app-update-order-details',
  templateUrl: './update-order-details.component.html',
  styleUrls: ['./update-order-details.component.scss']
})
export class UpdateOrderDetailsComponent implements OnInit {
  private promotionId: number | undefined;
  orderDetail:OrderDetail = new OrderDetail();

  orderForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private listOrderDetailsAdminService : ListOrderDetailsAdminService
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.orderForm = this.formBuilder.group({
      quantite: [this.data.record.user, Validators.required],
      detailAmount: [this.data.record.detailAmount, Validators.required],
      prixUnitaire: [this.data.record.prixUnitaire, Validators.required],
      userId: [this.data.record.user.username, Validators.required],
      productId: [this.data.record.product.name, Validators.required],
      orderId: [this.data.record.orderId, Validators.required],
    });
  }


  update() {
    console.log('update');
    const promotionvalues = this.orderForm.value;
    const data = {
      ...this.data.record,
      ...promotionvalues,
    };
    this.listOrderDetailsAdminService.EditOrderDetails(data).subscribe(() => {
      this.listOrderDetailsAdminService.findAllOrderDetails({ page: 0, size: 3 }).subscribe(() => {
        this.onClose();
      });
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
