import {Component, OnInit} from '@angular/core';
import {Promotion} from "../../../model/Promotion";
import {ActivatedRoute, Router} from "@angular/router";
import {PromtionService} from "../promtion.service";
import {Product} from "../../../model/Product";

@Component({
  selector: 'app-update-promo',
  templateUrl: './update-promo.component.html',
  styleUrls: ['./update-promo.component.scss']
})
export class UpdatePromoComponent implements OnInit{
  promotionId: number | undefined;
  promotion: Promotion = new Promotion();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private promotionService: PromtionService
  ) { }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.promotionId = +this.route.snapshot.paramMap.get('id');
    this.getPromotion();
  }

  getPromotion() {
    this.promotionService.getPromotion(this.promotionId).subscribe(
      (promotion: Promotion) => {
        this.promotion = promotion;
      },
      (error: any) => {
        console.error('Error retrieving promotion:', error);
      }
    );
  }

  updatePromotion() {
    this.promotionService.updatePromotion(this.promotionId, this.promotion).subscribe(
      (response: any) => {
        console.log('Promotion updated successfully:', response);
        this.router.navigateByUrl('http://localhost:2022/tunisia-camp/promotion/listPromo');
      },
      (error: any) => {
        console.error('Error updating promotion:', error);
      }
    );
  }
}
