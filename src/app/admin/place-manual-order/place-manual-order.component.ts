import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map, Subject, takeUntil } from 'rxjs';
import { AdminPlaceOrderService } from '../services/admin-place-order.service';

@Component({
  selector: 'app-place-manual-order',
  templateUrl: './place-manual-order.component.html',
  styleUrls: ['./place-manual-order.component.scss'],
  providers: [AdminPlaceOrderService]
})
export class PlaceManualOrderComponent implements OnInit, OnDestroy {
  OrderSteps: MenuItem[] = [];
  Destroy: Subject<void> = new Subject();
  constructor(private placeOrderServvice: AdminPlaceOrderService) {
    this.StepsInIt()
  }
  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }

  ngOnInit(): void {
    this.GetStep()
  }


  StepsInIt() {
    this.OrderSteps = [
      { label: 'Customer Information', routerLink: '/admin/place-order/customer-info' },
      { label: 'Items', routerLink: '/admin/place-order/items-selection', disabled: true },
      { label: 'Preview', routerLink: '/admin/place-order/order-preview', disabled: true },
    ]
  }
  GetStep() {
    this.placeOrderServvice.Step.pipe(takeUntil(this.Destroy), map((step: number) => {
      switch (step) {
        case 1:
          this.OrderSteps[1].disabled = false
          break;

        case 2:
          this.OrderSteps[2].disabled = false
          break;
      }
    })).subscribe()
  }

}
