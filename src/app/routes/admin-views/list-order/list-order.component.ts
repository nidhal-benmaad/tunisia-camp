import {Component, OnInit} from '@angular/core';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {CategorieService} from "../categorie.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {Title} from "@angular/platform-browser";
import {OrderService} from "../order.service";
import {PageEvent} from "@angular/material/paginator";
import {UpdateCategoryComponent} from "../update-category/update-category.component";
import {UpdatePromoComponent} from "../update-promo/update-promo.component";
import {UpdateOrderDetailsComponent} from "../update-order-details/update-order-details.component";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit{
  columns: MtxGridColumn[] = [
    { header: 'orderDate', field: 'orderDate' },
    { header: 'orderStatus', field: 'orderStatus' },
    { header: 'totalAmount', field: 'totalAmount' },
    { header: 'user_id', field: 'user.username' },
    { header: 'paymentId', field: 'paymentId' },

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
          click: record => this.edit(record),
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
          click: record => this.delete(record),
        },
      ],
    },




  ];

  list: any = [];
  total = 0;
  isLoading = true;

  query = {
    q: '',
    page: 0,
    size: 3,
  };
  private remoteSrv: any;
  private cdr: any;
  private order: any;
  get params() {
    const p = Object.assign({}, this.query);

    return p;
  }

  constructor(private orderService :OrderService, private router:Router, private translate: TranslateService,private dialog: MtxDialog,
              public titleService: Title
  ) {}


  ngOnInit(): void {
    this.findAllOrder();
    this.titleService.setTitle('Promotions');

  }

  findAllOrder(): void {
    this.isLoading = true;
    this.orderService
      .findAllOrder(this.query)
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
    const dialogRef = this.dialog.originalOpen(UpdateOrderDetailsComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
    this.orderService
      .findAllOrder({ page: 0, size: 3 })
      .subscribe((order) => {
        this.order = order;
      });
  }

  delete(value: any) {
    this.orderService.deleteOrder(value.id).subscribe(() => {
      this.dialog.alert('You have deleted');
      this.findAllOrder();
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.findAllOrder();
  }

  search() {
    this.query.page = 0;
    this.findAllOrder();
  }

  reset() {
    this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.findAllOrder();
  }



}
