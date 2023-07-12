import { Component, OnInit } from '@angular/core';
import { campsiteService } from './campsites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampsiteSelectionService } from '../booking/campsite-selection.service';
import { Store } from '@ngrx/store';
import { selectCampground, selectCampgroundState } from 'app/ngRx/selectors/campground.selectors';
import { ICampground, ICampsite, PageableList, SharedModule } from '@shared';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { HeaderFilterComponent } from '@shared/components/header-filter/header-filter.component';
import { campsiteList } from 'app/ngRx/selectors/campsite.selectors';
import { setCampsite, setCampsites } from 'app/ngRx/actions/campsite.actions';

@Component({
  selector: 'app-campsites',
  templateUrl: './campsites.component.html',
  styleUrls: ['./campsites.component.scss'],
})
export class CampsitesComponent implements OnInit {
  campground$: Observable<ICampground | null>;
  campsites$: Observable<PageableList>;
  constructor(
    private campsiteService: campsiteService,
    private route: ActivatedRoute,
    private router: Router,
    private campsiteSelectionService: CampsiteSelectionService,
    private store: Store
  ) {
    this.campground$ = this.store.select(selectCampground);
    this.campsites$ = this.store.select(campsiteList);
  }
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  list: any[] = [];
  total: number = 0;
  ratingFilter: string[] = [];
  categoryFilter: any = {
    camping: false,
    residence: false,
    village: false,
  };
  params: any = {
    page: 0,
    size: 2,
    campgroundId: null,
  };
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params.campgroundId = params.campgroundId;
      this.loading = true; // Set the loading state to true before making the API call
      this.getList();
    });

    this.campground$.subscribe(campground => {
      console.log('campground', campground);
    });
    this.campsites$.subscribe(campsites => {
      console.log('campsites', campsites);
      this.list = campsites.content;
      this.total = campsites.totalElements;
    });
  }
  applyFilters() {
    // Apply filters here and perform the search
    // You can access the selected filters using this.ratingFilter and this.categoryFilter
  }
  getList() {
    //this.error = false; // Reset the error state

    this.campsiteService.getCampsiteList(this.params).subscribe(
      (response: any) => {
        console.log('response', response);
        this.store.dispatch(setCampsites({ campsites: response }));
        // this.params.size = response.size;
        this.loading = false; // Set the loading state to false after successful API response
      },
      (error: any) => {
        this.error = true; // Set the error state to true
        this.errorMessage = 'Failed to fetch campsites. Please try again.'; // Set the error message based on your requirements
        this.loading = false; // Set the loading state to false after error
      }
    );
  }
  formatedDate(timestamp: any) {
    return moment(timestamp).format('LL');
  }
  redirectToBooking(item: any) {
    console.log('item', item);
    // this.campsiteSelectionService.setSelectedCampsite(item);
    this.store.dispatch(setCampsite({ campsite: item }));
    this.router.navigate(['/booking']);
  }
  handlePageEvent(e: any) {
    this.total = e.length;
    this.params.size = e.pageSize;
    this.params.page = e.pageIndex;
    this.getList();
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }
}
