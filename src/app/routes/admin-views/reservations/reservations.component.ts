import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ReservationService } from '../reservations.service';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { TablesKitchenSinkEditComponent } from 'app/routes/tables/kitchen-sink/edit/edit.component';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReservationService],
})
export class ReservationsComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Client', field: 'user.firstName' },
    { header: 'Camp site', field: 'campsite.name' },
    { header: 'Description', field: 'description', width: '300px' },
    { header: 'start date', field: 'startDate', type: 'date' },
    { header: 'End date', field: 'endDate', type: 'date' },
    { header: 'Number of guests', field: 'numGuests', type: 'number' },
    {
      header: 'Total',
      field: 'totalPrice',
      type: 'currency',
      typeParameter: { currencyCode: '$' },
    },
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
  list: any[] = [];
  total = 0;
  isLoading = true;

  query = {
    q: '',
    page: 0,
    size: 3,
  };

  get params() {
    const p = Object.assign({}, this.query);

    return p;
  }

  constructor(
    private remoteSrv: ReservationService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private dialog: MtxDialog
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.isLoading = true;

    this.remoteSrv.getList(this.params).subscribe(
      res => {
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

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: any) {
    this.remoteSrv.deleteReservation(value.id).subscribe(() => {
      this.dialog.alert(`You have deleted`);
      this.getList();
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getList();
  }

  search() {
    this.query.page = 0;
    this.getList();
  }

  reset() {
    this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.getList();
  }
}
