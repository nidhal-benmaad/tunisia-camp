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
  address: string;
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
  content: any[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
