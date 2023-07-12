import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { campsiteService } from '@shared/services';
import { setCampsites } from 'app/ngRx/actions/campsite.actions';
import { setFilter } from 'app/ngRx/actions/shared.actions';
import * as moment from 'moment';

export interface CampsiteFilter {
  startDate: Date | null;
  endDate: Date | null;
  page: number | 0;
  size: number | 0;
  numGuests: number | null;
}
@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss'],
})
export class HeaderFilterComponent implements OnInit {
  filter: CampsiteFilter;
  constructor(private campsiteService: campsiteService, private store: Store) {
    this.filter = {
      startDate: null,
      endDate: null,
      page: 0,
      size: 3,
      numGuests: null,
    };
  }
  ngOnInit(): void {}

  formatedDate(timestamp: any) {
    return moment(timestamp).format('YYYY-MM-DD');
  }
  search() {
    this.store.dispatch(setFilter({ filter: this.filter }));
    this.campsiteService
      .getCampsitesByDates({
        ...this.filter,
        startDate: this.formatedDate(this.filter.startDate),
        endDate: this.formatedDate(this.filter.endDate),
      })
      .subscribe(
        resp => {
          this.store.dispatch(setCampsites({ campsites: resp }));
        },
        (error: any) => {}
      );
  }
}
