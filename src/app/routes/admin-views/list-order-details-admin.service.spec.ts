import { TestBed } from '@angular/core/testing';

import { ListOrderDetailsAdminService } from './list-order-details-admin.service';

describe('ListOrderDetailsAdminService', () => {
  let service: ListOrderDetailsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOrderDetailsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
