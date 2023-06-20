import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  rating: number = 0;

  getRatingIcons(rating: number): string[] {
    const icons = [];
    for (let i = 0; i < rating; i++) {
      icons.push('star');
    }
    return icons;
  }
}
