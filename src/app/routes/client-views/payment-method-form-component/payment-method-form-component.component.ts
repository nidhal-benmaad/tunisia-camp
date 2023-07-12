import {Component, OnInit} from '@angular/core';
import {Payment} from "../../../model/Payment";
import {ProductFrontServiceService} from "../list-product-front/product-front-service.service";
import {PaymentType} from "../../../model/PaymentType";
import {OrderDetails} from "../../../model/OrderDetails";
import {OrderDetailsServiceService} from "../order-details-component/order-details-service.service";

@Component({
  selector: 'app-payment-method-form-component',
  templateUrl: './payment-method-form-component.component.html',
  styleUrls: ['./payment-method-form-component.component.scss']
})
export class PaymentMethodFormComponentComponent implements OnInit{


  payment: Payment = new Payment();
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isActive: boolean = true;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  paymentType: typeof PaymentType;
  totalOrderAmount= 0;
  orderDetails: OrderDetails[] = [];
  totalDetailAmount = 0;
  constructor(private productService: ProductFrontServiceService,private orderDetailsService: OrderDetailsServiceService
  ) {

    this.paymentType = PaymentType;


  }

  ngOnInit(): void {
    const userId = 1; // Remplacez 1 par l'ID de l'utilisateur que vous souhaitez récupérer
    this.getOrderDetails(userId);

  }

  getOrderDetails(userId: number) {
    this.orderDetailsService.getOrdersByUser(userId)
      .subscribe(
        (data: any) => {
          this.orderDetails = data.orders;
          this.totalDetailAmount = data.totalDetailAmount;
          this.totalOrderAmount = data.totalOrderAmount;

        },
        (error: any) => {
          console.log('Une erreur s\'est produite lors de la récupération des détails de commande :', error);
        }
      );
  }
  savedata(): void {
    this.payment.totalAmount = this.totalOrderAmount; // Ajoutez cette ligne pour assigner la valeur totalOrderAmount à la propriété totalAmount du paiement

    this.productService.createPayment(this.payment).subscribe(
      () => {
        alert('Payment created successfully.');
        this.resetForm();
      },
      (error: any) => {
        console.error(error);
        // Handle the error here
      }
    );
    this.productService.clearCart();

  }


  resetForm(): void {
    this.payment = new Payment();
  }
}
