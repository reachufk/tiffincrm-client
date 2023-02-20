import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryItemsComponent } from './catagory-items.component';

describe('CatagoryItemsComponent', () => {
  let component: CatagoryItemsComponent;
  let fixture: ComponentFixture<CatagoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagoryItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatagoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
