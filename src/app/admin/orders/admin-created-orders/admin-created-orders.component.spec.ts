import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatedOrdersComponent } from './admin-created-orders.component';

describe('AdminCreatedOrdersComponent', () => {
  let component: AdminCreatedOrdersComponent;
  let fixture: ComponentFixture<AdminCreatedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreatedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreatedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
