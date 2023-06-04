import { Component, Input } from '@angular/core';
import { IImage } from '../../interfaces/index';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() images: IImage[] = [];
  activeSlideIndex: number = 0;

  prevSlide() {
    this.activeSlideIndex =
      this.activeSlideIndex === 0 ? this.images.length - 1 : this.activeSlideIndex - 1;
  }

  nextSlide() {
    this.activeSlideIndex =
      this.activeSlideIndex === this.images.length - 1 ? 0 : this.activeSlideIndex + 1;
  }
}
