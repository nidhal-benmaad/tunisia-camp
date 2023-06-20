import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProductComponent } from './ajout-product.component';

describe('AjoutProductComponent', () => {
  let component: AjoutProductComponent;
  let fixture: ComponentFixture<AjoutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
