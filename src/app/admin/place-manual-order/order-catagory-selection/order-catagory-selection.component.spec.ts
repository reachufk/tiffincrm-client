import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCatagorySelectionComponent } from './order-catagory-selection.component';

describe('OrderCatagorySelectionComponent', () => {
  let component: OrderCatagorySelectionComponent;
  let fixture: ComponentFixture<OrderCatagorySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCatagorySelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCatagorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
