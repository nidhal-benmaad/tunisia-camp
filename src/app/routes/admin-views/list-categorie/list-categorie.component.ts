import {Component, OnInit} from '@angular/core';
import {PromtionService} from "../promtion.service";
import {CategorieService} from "../categorie.service";
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {Title} from "@angular/platform-browser";
import {PageEvent} from "@angular/material/paginator";
import {EditProductComponent} from "../product/edit/edit.component";
import {UpdateCategoryComponent} from "../update-category/update-category.component";

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent  implements OnInit {

  columns: MtxGridColumn[] = [
    { header: 'id', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },


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
  category : any;


  constructor(private s :CategorieService, private router:Router, private translate: TranslateService,private dialog: MtxDialog,
              public titleService: Title
  ) {



  }

  ngOnInit(): void {
    this.findAllCategory();
  }

  findAllCategory(): void {


    this.isLoading = true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.s.findAllCategory(this.params).subscribe((response) => {

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
    this.findAllCategory();
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(UpdateCategoryComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
    this.s.findAllCategory({ page: 0, size: 3 }).subscribe((product) => {
      // Mettre à jour la liste des produits affichés
      // eslint-disable-next-line no-self-assign
      this.category = this.category;
    });
  }
  delete(value: any) {
    this.s.deleteCatego(value.id).subscribe(() => {
      this.dialog.alert(`You have deleted`);
      this.findAllCategory();
    });
  }

  reset() {
    this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.findAllCategory();
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
