import {PaymentType} from "./PaymentType";

export class Payment {
  id!: number;
  name!: string;
  description!: string;
  image!: string;
  isActive!: boolean;
  accountNumber!: string;
  billingAddress!: string;
  expirationDate!: Date;
  paymentType!: PaymentType;
  createdAt!: Date;
  totalAmount!: number;
}
