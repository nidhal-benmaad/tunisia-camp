import {Component, OnInit} from '@angular/core';
import {PromtionService} from '../promtion.service';
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {Promotion} from "../../../model/Promotion";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  promotion: Promotion = new Promotion();

  constructor(private promotionService: PromtionService) {}

  ngOnInit(): void {}

  savedata(): void {
    this.promotionService.createPromotion(this.promotion).subscribe(
      () => {
        alert('Promotion created successfully.');
        this.resetForm();
      },
      (error) => {
        console.error(error);
        // Handle the error here
      }
    );
  }

  resetForm(): void {
    this.promotion = new Promotion();
  }

}
