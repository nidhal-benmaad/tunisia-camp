import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderDetailsComponent } from './update-order-details.component';

describe('UpdateOrderDetailsComponent', () => {
  let component: UpdateOrderDetailsComponent;
  let fixture: ComponentFixture<UpdateOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(UpdateOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
