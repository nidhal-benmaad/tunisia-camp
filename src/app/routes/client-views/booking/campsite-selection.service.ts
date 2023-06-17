import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CampsiteSelectionService {
  private selectedCampsite: any;

  constructor() {}

  setSelectedCampsite(campsite: any) {
    this.selectedCampsite = campsite;
  }

  getSelectedCampsite() {
    return this.selectedCampsite;
  }
}
