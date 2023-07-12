import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodFormComponentComponent } from './payment-method-form-component.component';

describe('PaymentMethodFormComponentComponent', () => {
  let component: PaymentMethodFormComponentComponent;
  let fixture: ComponentFixture<PaymentMethodFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodFormComponentComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
