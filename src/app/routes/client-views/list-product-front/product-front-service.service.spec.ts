import { TestBed } from '@angular/core/testing';

import { ProductFrontServiceService } from './product-front-service.service';

describe('ProductFrontServiceService', () => {
  let service: ProductFrontServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFrontServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
