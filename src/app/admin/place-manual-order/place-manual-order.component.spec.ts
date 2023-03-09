import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceManualOrderComponent } from './place-manual-order.component';

describe('PlaceManualOrderComponent', () => {
  let component: PlaceManualOrderComponent;
  let fixture: ComponentFixture<PlaceManualOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceManualOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceManualOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
