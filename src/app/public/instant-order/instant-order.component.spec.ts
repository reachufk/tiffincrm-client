import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstantOrder } from './instant-order.component';

describe('PublicLayoutComponent', () => {
  let component: InstantOrder;
  let fixture: ComponentFixture<InstantOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstantOrder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstantOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
