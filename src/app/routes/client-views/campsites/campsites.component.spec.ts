import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsitesComponent } from './campsites.component';

describe('CampsitesComponent', () => {
  let component: CampsitesComponent;
  let fixture: ComponentFixture<CampsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
