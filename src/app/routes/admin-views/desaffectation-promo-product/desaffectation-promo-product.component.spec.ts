import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaffectationPromoProductComponent } from './desaffectation-promo-product.component';

describe('DesaffectationPromoProductComponent', () => {
  let component: DesaffectationPromoProductComponent;
  let fixture: ComponentFixture<DesaffectationPromoProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesaffectationPromoProductComponent]
    });
    fixture = TestBed.createComponent(DesaffectationPromoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
