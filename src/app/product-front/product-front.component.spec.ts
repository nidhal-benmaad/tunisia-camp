import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFrontComponent } from './product-front.component';

describe('ProductFrontComponent', () => {
  let component: ProductFrontComponent;
  let fixture: ComponentFixture<ProductFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFrontComponent]
    });
    fixture = TestBed.createComponent(ProductFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
