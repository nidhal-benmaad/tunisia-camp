import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponentComponent } from './order-details-component.component';

describe('OrderDetailsComponentComponent', () => {
  let component: OrderDetailsComponentComponent;
  let fixture: ComponentFixture<OrderDetailsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsComponentComponent]
    });
    fixture = TestBed.createComponent(OrderDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
