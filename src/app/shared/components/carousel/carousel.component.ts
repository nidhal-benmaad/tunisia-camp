import { Component, Input } from '@angular/core';
import { IImage } from '../../interfaces/index';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() images: IImage[] = [];
}
