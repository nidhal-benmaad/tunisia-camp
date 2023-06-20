import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampsiteSelectionService } from './campsite-selection.service';
import { IReservation, IUser } from '@shared';
import * as moment from 'moment';
import { ReservationService } from 'app/routes/admin-views/reservations.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  selectedIndex: number = 1;
  selectedCampsite: any;
  informationStep: any = {
    editable: false,
    completed: false,
  };
  user: IUser;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private campsiteSelectionService: CampsiteSelectionService,
    private reservationService: ReservationService
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber: '',
      role: 'GUEST',
    };
  }

  ngOnInit() {
    this.selectedCampsite = this.campsiteSelectionService.getSelectedCampsite();
    this.bookingForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      address: [this.user.address, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      role: [this.user.role, Validators.required],
    });

    if (this.bookingForm && this.bookingForm.get('informationField')) {
      this.selectedIndex = 1; // Select the information step by default
    }
  }
  formatedDate(timestamp: any) {
    return moment(timestamp).format('LL');
  }
  handleReservation(item: any) {
    const userValues = this.bookingForm.value;
    const reservation: IReservation = {
      startDate: new Date('04/06/2023'),
      endDate: new Date('08/06/2023'),
      numGuests: 0,
      campsite: item,
      totalPrice: item.price,
      user: userValues,
    };

    this.reservationService.addReservation(reservation).subscribe({
      next: res => {
        // Handle the successful response from the server
        console.log('Reservation added successfully:', res);
        // Reset the form or perform any other necessary actions
      },
      error: error => {
        // Handle the error response from the server
        console.error('Error adding reservation:', error);
        // Handle the error, show an error message, etc.
      },
    });
  }
}
