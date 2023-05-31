import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ReservationService } from '../reservations.service';
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
  ];
  list: any[] = [];
  total = 0;
  isLoading = true;

  query = {
    page: 0,
    size: 3,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }

  constructor(private remoteSrv: ReservationService, private cdr: ChangeDetectorRef) {}

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
    this.query.page = 0;
    this.query.size = 10;
    this.getList();
  }
}
