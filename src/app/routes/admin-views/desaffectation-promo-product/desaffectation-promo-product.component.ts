import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {PromtionService} from "../promtion.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-desaffectation-promo-product',
  templateUrl: './desaffectation-promo-product.component.html',
  styleUrls: ['./desaffectation-promo-product.component.scss']
})
export class DesaffectationPromoProductComponent {
  promotionId!: number;
  productId!: number;
  isDesaffectationSuccessful = false;

  constructor(private promotionService: PromtionService) {}

  removeProductFromPromotion(): void {
    console.log('Promotion ID:', this.promotionId);
    console.log('Product ID:', this.productId);
    // Reste du code de la méthode removeProductFromPromotion

    this.promotionService.removeProductFromPromotion(this.promotionId, this.productId)
      .subscribe(
        () => {

          this.isDesaffectationSuccessful = true;

        },
        (error) => {

          console.error('Une erreur s\'est produite lors de la suppression', error);
        }
      );
  }

}
