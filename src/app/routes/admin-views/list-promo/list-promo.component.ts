import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../../model/Promotion';
import { PromtionService } from '../promtion.service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { UpdatePromoComponent } from '../update-promo/update-promo.component';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.scss'],
})
export class ListPromoComponent implements OnInit {
  startDate!: string;
  endDate!: string;

  columns: MtxGridColumn[] = [
    { header: 'Code', field: 'code' },
    { header: 'Discount', field: 'discount' },
    { header: 'start date', field: 'startDate', type: 'date' },
    { header: 'End date', field: 'endDate', type: 'date' },
    {
      header: this.translate.stream('table_kitchen_sink.operation'),
      field: 'operation',
      minWidth: 160,
      width: '160px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          click: (record) => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: {
            title: this.translate.stream('table_kitchen_sink.confirm_delete'),
            closeText: this.translate.stream('table_kitchen_sink.close'),
            okText: this.translate.stream('table_kitchen_sink.ok'),
          },
          click: (record) => this.delete(record),
        },
      ],
    },
  ];
  promotion: any;
  list: any = [];
  total = 0;
  isLoading = true;

  query = {
    q: '',
    page: 0,
    size: 3,
  };

  constructor(
    private promotionService: PromtionService,
    private router: Router,
    private translate: TranslateService,
    private dialog: MtxDialog,
    public titleService: Title
  ) {}

  ngOnInit(): void {
    this.getAllPromotions();
    this.titleService.setTitle('Promotions');

  }

  getAllPromotions(): void {
    this.isLoading = true;
    this.promotionService
      .getAllPromotions(this.query)
      .subscribe(
        (response) => {
          this.list = response.content;
          this.total = response.totalElements;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching promotions:', error);
        }
      );
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(UpdatePromoComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
    this.promotionService
      .getAllPromotions({ page: 0, size: 3 })
      .subscribe((promotion) => {
        this.promotion = promotion;
      });
  }

  delete(value: any) {
    this.promotionService.deletePromo(value.id).subscribe(() => {
      this.dialog.alert('You have deleted');
      this.getAllPromotions();
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getAllPromotions();
  }

  search() {
    this.query.page = 0;
    this.getAllPromotions();
  }

  reset() {
    this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.getAllPromotions();
  }

  getPromotionsByDates(startDate: string, endDate: string) {
    this.promotionService
      .getPromotionsByDates(startDate, endDate)
      .subscribe(
        (promotions) => {
          this.list = promotions;
          this.total = promotions.length;
        },
        (error) => {
          console.error('Error fetching promotions by dates:', error);
        }
      );
  }

  submitDates() {
    if (this.startDate && this.endDate) {
      this.getPromotionsByDates(this.startDate, this.endDate);
    } else {
      console.error('Veuillez sélectionner les dates de début et de fin.');
    }
  }


}
