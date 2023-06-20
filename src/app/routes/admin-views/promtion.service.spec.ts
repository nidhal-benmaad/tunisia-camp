import { TestBed } from '@angular/core/testing';

import { PromtionService } from './promtion.service';

describe('PromtionService', () => {
  let service: PromtionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromtionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
