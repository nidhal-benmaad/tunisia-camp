import { Component } from '@angular/core';
import { HomeService } from './home.service';

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

  constructor(private hService: HomeService) {}
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
  search() {
    // Perform search functionality based on the entered filters
    console.log('Search clicked!');
    console.log('Destination:', this.destination);
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
  }
}
