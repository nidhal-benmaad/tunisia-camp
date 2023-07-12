import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductFrontComponent } from './list-product-front.component';

describe('ListProductFrontComponent', () => {
  let component: ListProductFrontComponent;
  let fixture: ComponentFixture<ListProductFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductFrontComponent]
    });
    fixture = TestBed.createComponent(ListProductFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
