import {ProductDTO} from "./ProductDTO";
import {PaymentType} from "./PaymentType";
import {OrderStatus} from "./orderStatus";

export class OrderDetails {
  id!: number;
  orderDate!: string;

  totalAmount!: number;
  ordersdetails: OrderDetail[] = [];
  product!: ProductDTO;
  payment_method_id!: PaymentType;

  user_id!:number;

  orderStatus!: OrderStatus;


}
export class OrderDetail {
  id!: number;
  quantite!: number;
  detailAmount!: number;
  prixUnitaire!: number;
  orderId!: number;

}
