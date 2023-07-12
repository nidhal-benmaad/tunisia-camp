import { FormGroup, FormControl } from '@angular/forms';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  address: any;
}
export interface IReservation {
  startDate: Date;
  endDate: Date;
  user: IUser;
  totalPrice: Number;
  numGuests: Number;
  campsite: ICampsite;
}
export interface ICampsite {
  images: any[];
  name: string;
  description: string;
  capacity: number;
  createdDate: Date;
  startDateAv: Date;
  endDateAv: Date;
  isAvailable: boolean;
  price: Number;
  rating: Number;
}
export interface ICampground {
  images: any[];
  name: string;
  descriptions: string;
  rating: number;
  activities: any;
  location: any;
}

export interface IProfile {
  username: string;
  email: string;
  gender: string;
  city: string;
  address: string;
  company: string;
  mobile: string;
  tele: string;
  website: string;
  date: string;
}

export interface IImage {
  id: number;
  url: string;
}

export interface PageableList {
  content: any[] | [];
  totalPages: number | 0;
  totalElements: number | 0;
  size: number | 0;
  number: number | 0;
}

export interface CheckoutPayment {
  name: String;
  email: String;
  currency: String;
  successUrl: String | null;
  cancelUrl: String | null;
  amount: number | null;
  quantity: number | null;
  cardNumber: String | null;
  cardExpiryMonth: number | null;
  cardExpiryYear: number | null;
  cardCvc: String | null;
}
