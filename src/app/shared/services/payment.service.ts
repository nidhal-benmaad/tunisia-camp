import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutPayment, PageableList } from '@shared';
import { PaymentIntent } from '@stripe/stripe-js';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class paymentService {
  constructor(private http: HttpClient) {}

  public createPaymentIntent(payload: any) {
    return this.http.post(`${environment.serverUrl}/api/payment`, payload);
  }
}
