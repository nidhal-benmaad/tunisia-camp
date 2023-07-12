import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampsiteSelectionService } from './campsite-selection.service';
import { ICampsite, IReservation, IUser } from '@shared';
import * as moment from 'moment';
import { ReservationService } from 'app/routes/admin-views/reservations.service';
import { Store } from '@ngrx/store';
import { setReservation } from 'app/ngRx/actions/reservation.actions';
import { selectCampsite } from 'app/ngRx/selectors/campsite.selectors';
import { Observable, tap } from 'rxjs';
import { selectPaymentSuccess } from 'app/ngRx/selectors/payment.selectors';
import { selectFilter } from 'app/ngRx/selectors/shared.selectors';
import { selectReservation } from 'app/ngRx/selectors/reservation.selectors';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  campsite$: Observable<ICampsite | null>;
  paymentSuccess$: Observable<boolean>;
  filter$: Observable<any>;
  reservation$: Observable<IReservation | null>;
  bookingForm!: FormGroup;
  selectedIndex: number = 1;
  selectedCampsite: any;
  informationStep: any = {
    editable: false,
    completed: false,
  };
  numGuests = new FormControl();
  totalPrice: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private campsiteSelectionService: CampsiteSelectionService,
    private reservationService: ReservationService,
    private store: Store
  ) {
    this.campsite$ = this.store.select(selectCampsite);
    this.paymentSuccess$ = this.store.select(selectPaymentSuccess);
    this.filter$ = this.store.select(selectFilter);
    this.reservation$ = this.store.select(selectReservation);
  }

  ngOnInit() {
    this.selectedCampsite = this.campsiteSelectionService.getSelectedCampsite();
    this.totalPrice = 0;
    this.bookingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, , Validators.email],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: 'GUEST',
    });

    if (this.bookingForm && this.bookingForm.get('informationField')) {
      this.selectedIndex = 1; // Select the information step by default
    }
    this.filter$.subscribe(filter => {
      this.selectedCampsite = filter;
    });
    this.campsite$.subscribe(campsite => {
      this.selectedCampsite = campsite;
    });
    this.paymentSuccess$.subscribe(paymentSuccess => {
      console.log('paymentSuccess', paymentSuccess);
      if (!paymentSuccess) return;
      this.reservation$.subscribe(reservation => {
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
      });
    });
  }
  formatedDate(timestamp: any) {
    return moment(timestamp).format('LL');
  }
  isInformationStepValid(): boolean {
    const formControls = this.bookingForm.controls;
    // Check the validity of each form control
    const isValid = Object.keys(formControls).every(key => formControls[key].valid);
    return isValid;
  }
  guestList() {
    return Array.from({ length: this.numGuests.value }, (_, index) => index + 1);
  }
  calculateTotal(): string {
    let total = this.selectedCampsite.price;
    let nbrGuests = Number(this.numGuests.value) + 1;
    if (nbrGuests) total = Number(this.selectedCampsite.price) * nbrGuests;

    this.totalPrice = total * 100;
    return total + '€';
  }
  handleReservation() {
    const userValues = this.bookingForm.value;
    const reservation: IReservation = {
      startDate: this.selectedCampsite.startDateAv,
      endDate: this.selectedCampsite.endDateAv,
      numGuests: this.numGuests.value,
      campsite: this.selectedCampsite,
      totalPrice: this.totalPrice,
      user: userValues,
    };
    this.filter$
      .pipe(
        tap(filter => {
          reservation.startDate = filter.startDate;
          reservation.endDate = filter.endDate;
        })
      )
      .subscribe();
    this.store.dispatch(setReservation({ reservation }));
  }
}
