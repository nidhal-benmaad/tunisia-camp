import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  campings: any[] = [
    {
      name: 'camping1',
      image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
      rating: 4,
    },
    {
      name: 'camping2',
      rating: 4,
    },
    {
      name: 'camping3',
      rating: 4,
    },
  ];
  destination: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  ratingFilter: string[] = [];
  categoryFilter: any = {
    camping: false,
    residence: false,
    village: false,
  };

  applyFilters() {
    // Apply filters here and perform the search
    // You can access the selected filters using this.ratingFilter and this.categoryFilter
  }
  constructor(private hService: HomeService, private router: Router) {}
  ngOnInit() {
    this.getList();
  }

  getList() {
    this.hService.getCampingList().subscribe(
      res => {
        console.log('res', res);
        this.campings = Object.assign(res);
      },
      () => {},
      () => {}
    );
  }
  getOffers(campgroundId: number) {
    this.router.navigate(['/campsites'], { queryParams: { campgroundId } });
  }
  search() {
    // Perform search functionality based on the entered filters
    console.log('Search clicked!');
    console.log('Destination:', this.destination);
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
  }
}
