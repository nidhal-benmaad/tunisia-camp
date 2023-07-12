import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderDetailsAdminComponent } from './list-order-details-admin.component';

describe('ListOrderDetailsAdminComponent', () => {
  let component: ListOrderDetailsAdminComponent;
  let fixture: ComponentFixture<ListOrderDetailsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrderDetailsAdminComponent]
    });
    fixture = TestBed.createComponent(ListOrderDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
