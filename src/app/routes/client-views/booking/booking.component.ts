import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampsiteSelectionService } from './campsite-selection.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  selectedIndex: number = 1;
  selectedCampsite: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private campsiteSelectionService: CampsiteSelectionService
  ) {}

  ngOnInit() {
    this.selectedCampsite = this.campsiteSelectionService.getSelectedCampsite();
    this.bookingForm = this.formBuilder.group({
      // Define your form fields with their respective validators
      informationField: [null, Validators.required],
    });

    if (this.bookingForm && this.bookingForm.get('informationField')) {
      this.selectedIndex = 1; // Select the information step by default
    }
  }
}
