import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../admin-views/product.service';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {PageEvent} from "@angular/material/paginator";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {EditProductComponent} from "./edit/edit.component";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'id', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
    { header: 'price', field: 'price' },
    { header: 'quantity', field: 'quantity'},


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
  get params() {
    const p = Object.assign({}, this.query);

    return p;
  }
  // Define the columns array

  product : any;
  productId: number | undefined;

  constructor(private s :ProductService, private router:Router, private translate: TranslateService,private dialog: MtxDialog,
              public titleService: Title
  ) {



  }

  ngOnInit(): void {
    this.findAllProducts();
  }

  findAllProducts(): void {


    this.isLoading = true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.s.findAllProducts(this.params).subscribe((response) => {

        this.list = response.content;
        this.total= response.totalElements
        this.isLoading = false
      },
      (error: any) => {
        console.error('Error fetching promotions:', error);
      }
    );

  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.findAllProducts();
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(EditProductComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
    this.s.findAllProducts({ page: 0, size: 3 }).subscribe((product) => {
      // Mettre à jour la liste des produits affichés
      this.product = product;
    });
  }


  delete(value: any) {
    this.s.deleteProduct(value.id).subscribe(() => {
      this.dialog.alert(`You have deleted`);
      this.findAllProducts();
    });
  }

  reset() {
    this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.findAllProducts();
  }
  getList() {
    this.isLoading = true;

    this.remoteSrv.getList(this.params).subscribe(
      (res: { content: any[]; totalElements: number; }) => {
        console.log('res', res);
        this.list = res.content;
        this.total = res.totalElements;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }

  }

