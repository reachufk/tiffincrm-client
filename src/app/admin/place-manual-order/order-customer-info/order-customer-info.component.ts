import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AdminPlaceOrderService } from '../../services/admin-place-order.service';

@Component({
  selector: 'app-order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss']
})
export class OrderCustomerInfoComponent implements OnInit,OnDestroy {

  CustomerInfoForm: FormGroup
  router = inject(Router);
  Destroy: Subject<void> = new Subject();
  OrderTypes:Array<any>=[{name:'Lunch',value:'lunch'},{name:'Dinner',value:'dinner'}]
  constructor(private placeOrderService: AdminPlaceOrderService) {

  }

  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }

  ngOnInit(): void {
    this.CreateForm();
    this.placeOrderService.CustomerInfoSubject.pipe(takeUntil(this.Destroy),map((customerInfo:any)=>{
      if(!customerInfo){
        return
      }
      this.CustomerInfoForm.patchValue(customerInfo)
    })).subscribe()

  }

  NextStep() {
    validateAllFormFields(this.CustomerInfoForm);
    if (!this.CustomerInfoForm.valid) {
      return
    }
    this.placeOrderService.CustomerInfoSubject.next(this.CustomerInfoForm.value);
    this.placeOrderService.Step.next(1)
    this.router.navigate(['/admin/place-order/items-selection'])
  }
  CreateForm() {
    this.CustomerInfoForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(13)]),
      email: new FormControl(null, [Validators.email]),
      orderAddress: new FormControl(null, [Validators.required]),
      orderType:new FormControl('lunch',[Validators.required]),
      orderInstructions:new FormControl(null),
      orderMode:new FormControl('offline'),
      orderPaymentMode:new FormControl('COD')
    })
  }
}
