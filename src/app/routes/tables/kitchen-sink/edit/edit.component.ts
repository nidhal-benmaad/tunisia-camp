import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from 'app/routes/admin-views/reservations.service';

@Component({
  selector: 'app-table-kitchen-sink-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class TablesKitchenSinkEditComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TablesKitchenSinkEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.formGroup = this.formBuilder.group({
      startDate: [this.data.record.startDate, Validators.required],
      endDate: [this.data.record.endDate, Validators.required],
      numGuests: [this.data.record.numGuests, Validators.required],
      totalPrice: [this.data.record.totalPrice, Validators.required],
    });
  }
  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }
  update() {
    console.log('update');
    const reservationValues = this.formGroup.value;
    let data = {
      ...this.data.record,
      ...reservationValues,
    };
    this.reservationService.updateReservation(data).subscribe(() => {
      this.reservationService.getList({ page: 0, size: 3 }).subscribe(() => {
        this.onClose();
      });
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
