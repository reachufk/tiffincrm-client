import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsSelectionComponent } from './order-items-selection.component';

describe('OrderItemsSelectionComponent', () => {
  let component: OrderItemsSelectionComponent;
  let fixture: ComponentFixture<OrderItemsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemsSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
