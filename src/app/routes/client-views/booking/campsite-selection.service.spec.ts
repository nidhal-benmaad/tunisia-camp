import { TestBed } from '@angular/core/testing';

import { CampsiteSelectionService } from './campsite-selection.service';

describe('CampsiteSelectionService', () => {
  let service: CampsiteSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampsiteSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
