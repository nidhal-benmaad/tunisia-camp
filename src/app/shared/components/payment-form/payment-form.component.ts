import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { StripeElementsOptions, Appearance } from '@stripe/stripe-js';

import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { DialogComponent } from '../dialog/dialog.component';
import { paymentService } from '@shared/services/payment.service';
import { ReservationService } from 'app/routes/admin-views/reservations.service';
import { Observable } from 'rxjs';
import { IReservation } from '@shared/interfaces';
import { Store } from '@ngrx/store';
import { selectReservation } from 'app/ngRx/selectors/reservation.selectors';
import { setPaymentSuccess } from 'app/ngRx/actions/payment.actions';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  @Input() totalAmount: number = 0;
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  reservation$: Observable<IReservation | null>;
  reservation: IReservation | null = null;
  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    amount: [this.totalAmount, [Validators.required, Validators.pattern(/\d+/)]],
  });

  appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paying = false;

  get amount(): number {
    // const amountControl = this.checkoutForm.get('amount');
    // if (!amountControl?.value) {
    //   return 0;
    // }
    // const amount = amountControl.value;
    return this.totalAmount;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private stripeService: StripeService,
    private paymentService: paymentService,
    private reservationService: ReservationService,
    private store: Store
  ) {
    this.reservation$ = this.store.select(selectReservation);
  }

  ngOnInit() {
    this.store.dispatch(setPaymentSuccess({ paymentSuccess: false }));
    this.paymentService
      .createPaymentIntent({
        amount: this.totalAmount,
        currency: 'eur',
      })
      .subscribe((pi: any) => {
        this.elementsOptions.clientSecret = pi.clientSecret;
      });
    this.reservation$.subscribe((reservation: any) => {
      this.reservation = reservation;
    });
  }

  collectPayment() {
    if (this.paying) return;
    if (this.checkoutForm.invalid) {
      return;
    }

    this.paying = true;
    this.stripeService
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.checkoutForm?.get('name')?.value ?? '',
              email: this.checkoutForm?.get('email')?.value ?? '',
              address: {
                line1: this.checkoutForm?.get('address')?.value ?? '',
                postal_code: this.checkoutForm?.get('zipcode')?.value ?? '',
                city: this.checkoutForm?.get('city')?.value ?? '',
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe(
        result => {
          this.paying = false;
          if (result.error) {
            this.dialog.open(DialogComponent, {
              data: {
                type: 'error',
                message: result.error.message,
              },
            });
          } else if (result.paymentIntent?.status === 'succeeded') {
            this.dialog.open(DialogComponent, {
              data: {
                type: 'success',
                message: 'Payment processed successfully',
              },
            });
            this.store.dispatch(setPaymentSuccess({ paymentSuccess: true }));
          }
        },
        error => {
          this.paying = false;
          this.dialog.open(DialogComponent, {
            data: {
              type: 'error',
              message: error.message || 'Unknown Error',
            },
          });
        }
      );
  }

  clear() {
    this.checkoutForm.patchValue({
      name: '',
      email: '',
      address: '',
      zipcode: '',
      city: '',
    });
  }
}
