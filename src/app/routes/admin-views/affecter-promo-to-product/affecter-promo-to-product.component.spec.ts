import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterPromoToProductComponent } from './affecter-promo-to-product.component';

describe('AffecterPromoToProductComponent', () => {
  let component: AffecterPromoToProductComponent;
  let fixture: ComponentFixture<AffecterPromoToProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffecterPromoToProductComponent]
    });
    fixture = TestBed.createComponent(AffecterPromoToProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
