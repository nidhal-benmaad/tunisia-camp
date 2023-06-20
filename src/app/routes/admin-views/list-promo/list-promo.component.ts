import {Component, OnInit} from '@angular/core';
import {Promotion} from "../../../model/Promotion";
import {PromtionService} from "../promtion.service";

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.scss']
})
export class ListPromoComponent  implements OnInit {

  promotion: any ;

  constructor(private promotionService: PromtionService) { }

  ngOnInit(): void {
    this.getAllPromotions();
  }
  getAllPromotions(): void {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.promotionService.getAllPromotions().subscribe((promotion) => {
        this.promotion = promotion;
      },
      (error: any) => {
        console.error('Error fetching promotions:', error);
      }
    );
  }
  deletePromo(id: number): void {
    this.promotionService.deletePromo(id).subscribe(() => {
      // Optional: Show success message or perform any other desired actions
      // After successful deletion, refresh the product list
      this.getAllPromotions();
    });
  }


}
