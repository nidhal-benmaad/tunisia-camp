import { Component, OnInit } from '@angular/core';

export interface CampsiteFilter {
  startDate: Date | null;
  endDate: Date | null;
  numGuests: number;
}
@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss'],
})
export class HeaderFilterComponent implements OnInit {
  filter: CampsiteFilter;
  constructor() {
    this.filter = {
      startDate: null,
      endDate: null,
      numGuests: 0,
    };
  }
  ngOnInit(): void {}
  search() {}
}
