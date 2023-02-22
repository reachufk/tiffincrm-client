import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoweredBy } from './powered-by.component';

describe('PublicLayoutComponent', () => {
  let component: PoweredBy;
  let fixture: ComponentFixture<PoweredBy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoweredBy]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PoweredBy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
