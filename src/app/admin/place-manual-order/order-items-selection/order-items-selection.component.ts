import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AdminPlaceOrderService } from '../../services/admin-place-order.service';

@Component({
  selector: 'app-order-items-selection',
  templateUrl: './order-items-selection.component.html',
  styleUrls: ['./order-items-selection.component.scss']
})
export class OrderItemsSelectionComponent implements OnInit, OnDestroy {

  Items: Array<any> = [];
  keyword: FormControl = new FormControl("")
  CurrentPage: number = 1;
  TotalPages: Number = 1;
  TotalRecords: Number = 0;
  selectedItems: Array<any> = []
  Destroy: Subject<void> = new Subject();
  TotalAmountCalculated: number = 0
  constructor(private router: Router, private placeOrderService: AdminPlaceOrderService,
    private messageService: MessageService) {

  }

  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }
  ngOnInit(): void {
    this.GetItems()
    this.placeOrderService.ItemsSubject.pipe(takeUntil(this.Destroy), map((items: any) => {
      if (!items) {
        return
      }
      this.selectedItems = items
      this.TotalAmountCalculated = this.selectedItems?.reduce((acc, curr) => acc + (curr.itemPrice * curr?.count), 0);
    })).subscribe()

  }

  pageChanged(page: number) {
    this.CurrentPage = page
    this.GetItems()
  }
  GetItems() {
    const payload = { pageNo: this.CurrentPage, pageSize: 20, keyword: this.keyword.value }
    this.placeOrderService.GetAllItems(payload).subscribe((res: any) => {
      this.TotalPages = res.totalPages;
      this.TotalRecords = res?.totalCount;
      this.Items = res?.items.map((item: any) => ({ ...item, count: 1 }))
      if (this.selectedItems?.length) {
        this.selectedItems.forEach(selectedItem => {
          const selected = this.Items.find(item => item._id === selectedItem._id);
          if (selected) {
            selected.count = selectedItem.count;
          }
        });
      }
    })
  }

  Change(event) {
    this.TotalAmountCalculated = this.selectedItems?.reduce((acc, curr) => acc + (curr.itemPrice * curr?.count), 0);
  }

  BackStep() {
    this.placeOrderService.ItemsSubject.next(this.selectedItems);
    this.router.navigate(['/admin/place-order/customer-info'])
  }
  NextStep() {
    if (!this.selectedItems.length) {
      this.messageService.add({ severity: 'error', summary: 'Place select your items' });
      return
    }
    this.placeOrderService.ItemsSubject.next(this.selectedItems);
    this.placeOrderService.Step.next(2);
    this.router.navigate(['/admin/place-order/order-preview'])
  }

}
