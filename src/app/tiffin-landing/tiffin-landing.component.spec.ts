import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffinLandingComponent } from './tiffin-landing.component';

describe('TiffinLandingComponent', () => {
  let component: TiffinLandingComponent;
  let fixture: ComponentFixture<TiffinLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiffinLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiffinLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
