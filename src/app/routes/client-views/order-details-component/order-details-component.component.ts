import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDetail, OrderDetails} from "../../../model/OrderDetails";
import { OrderDetailsServiceService } from "./order-details-service.service";
import {ProductDTO} from "../../../model/ProductDTO";
import {ProductDetailAmount} from "../../../model/ProductDetailAmount";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details-component.component.html',
  styleUrls: ['./order-details-component.component.scss']
})
export class OrderDetailsComponentComponent implements OnInit {
  orderDetails: OrderDetails[] = [];
  OrderDetail:OrderDetail[]=[];
  totalDetailAmount = 0; // Remplacez le type 'number' par le type approprié si nécessaire
  totalOrderAmount = 0; // Remplacez le type 'number' par le type approprié si nécessaire
  products: ProductDTO[] = [];
  productDetailAmounts: ProductDetailAmount[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsServiceService,
    private router: Router,
  ) {
  }

  discountedPrice = this.route.snapshot.queryParamMap.get('discountedPrice');
  selectedOrderId!: number;

  private userId!: number;

  ngOnInit() {
    this.userId = 1; // Remplacez 1 par l'ID de l'utilisateur que vous souhaitez récupérer
    this.getOrderDetails(this.userId);
  }

  getOrderDetails(userId: number) {
    this.orderDetailsService.getOrdersByUser(userId)
      .subscribe(
        (data: any) => {
          this.orderDetails = data.orders;
          this.totalDetailAmount = data.totalDetailAmount;
          this.totalOrderAmount = data.totalOrderAmount;
          this.products = data.products;
          this.productDetailAmounts = data.productDetailAmounts;
        },
        (error: any) => {
          console.log('Une erreur s\'est produite lors de la récupération des détails de commande :', error);
        }
      );
  }


  deleteOrder(productDetailAmount: OrderDetail) {
    const orderId = productDetailAmount.id;
    if (orderId) {
      this.orderDetailsService.deleteOrderDetails(orderId)
        .subscribe(
          () => {
            // Suppression réussie, mettre à jour la liste des commandes si nécessaire
            this.getOrderDetails(this.userId);
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la suppression de la commande :', error);
          }
        );
    }
  }

  deleteOrderDetails(productDetailAmount: ProductDetailAmount) {
    console.log("tttttttttttt",productDetailAmount)


    this.orderDetailsService.deleteOrderDetails(productDetailAmount.orderId).subscribe(
      () => {
        // Suppression réussie, mettez à jour vos données ou effectuez d'autres opérations nécessaires
        console.log('Order details deleted successfully.');
        this.getOrderDetails(this.userId);

      },
      (error: any) => {
        console.error('An error occurred while deleting order details:', error);
        // Gérer l'erreur ici
      }
    );
  }

  goToCartPage() {
    // Navigate to the cart page
    this.router.navigate(['/order/1/orders']); // Adjust the route according to your application's routes
  }
}
