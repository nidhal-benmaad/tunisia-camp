import {Component, OnInit} from '@angular/core';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {OrderService} from "../order.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {Title} from "@angular/platform-browser";
import {UpdatePromoComponent} from "../update-promo/update-promo.component";
import {PageEvent} from "@angular/material/paginator";
import {ListOrderDetailsAdminService} from "../list-order-details-admin.service";
import {UpdateOrderDetailsComponent} from "../update-order-details/update-order-details.component";

@Component({
  selector: 'app-list-order-details-admin',
  templateUrl: './list-order-details-admin.component.html',
  styleUrls: ['./list-order-details-admin.component.scss']
})
export class ListOrderDetailsAdminComponent implements OnInit{
  columns: MtxGridColumn[] = [
    { header: 'id', field: 'id' },
    { header: 'quantite', field: 'quantite' },
    { header: 'detailAmount', field: 'detailAmount' },
    { header: 'prixUnitaire', field: 'prixUnitaire' },
    { header: 'productId', field: 'product.name' },
    { header: 'userId', field: 'user.username' },
    { header: 'order_id', field: 'order.id' },

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
    page: 0,
    size: 3,
  };

  private remoteSrv: any;
  private cdr: any;
  private order: any;
  private orderDetails: any;
  get params() {
    const p = Object.assign({}, this.query);

    return p;
  }

  constructor(private  listOrderDetailsAdminService:ListOrderDetailsAdminService, private router:Router, private translate: TranslateService,private dialog: MtxDialog,
              public titleService: Title
  ) {}


  ngOnInit(): void {
    this.findAllOrderDetails();
    this.titleService.setTitle('Promotions');

  }

  findAllOrderDetails(): void {
    this.isLoading = true;
    this.listOrderDetailsAdminService
      .findAllOrderDetails(this.query)
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
    this.listOrderDetailsAdminService
      .findAllOrderDetails({ page: 0, size: 3 })
      .subscribe((orderDetails) => {
        this.orderDetails = orderDetails;
      });
  }

  delete(value: any) {
    this.listOrderDetailsAdminService.deleteOrderDetails(value.id).subscribe(() => {
      this.dialog.alert(`You have deleted`);
      this.findAllOrderDetails();
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.findAllOrderDetails();
  }

  search() {
    this.query.page = 0;
    this.findAllOrderDetails();
  }

  reset() {
  //  this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.findAllOrderDetails();
  }


}
