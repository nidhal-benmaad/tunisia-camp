import { Component } from '@angular/core';
import {PromtionService} from "../promtion.service";
import {Product} from "../../../model/Product";
import {Promotion} from "../../../model/Promotion";

@Component({
  selector: 'app-affecter-promo-to-product',
  templateUrl: './affecter-promo-to-product.component.html',
  styleUrls: ['./affecter-promo-to-product.component.scss']
})
export class AffecterPromoToProductComponent {
  promotionId: number;
  productId: number;

  constructor(private promotionService: PromtionService) {

    this.promotionId = 0; // Initialise la valeur par défaut du promotionId à 0
    this.productId = 0; // Initialise la valeur par défaut du productId à 0
  }
  productReturned: Product= new Product();

  affecterPromoToProduct(): void {
    console.log('Promotion ID:', this.promotionId);
    console.log('Product ID:', this.productId);
    this.promotionService.retourProductPromo(this.promotionId, this.productId)
      .subscribe(
        (product: Product) => {
          console.log('Product returned with promotion:', product);
          this.productReturned = product;
          this.productReturned.discountedPrice = product.discountedPrice;
        },
        (error: any) => {
          console.error('Error returning product with promotion:', error);
          // Handle the error appropriately
        }
      );
  }
}
