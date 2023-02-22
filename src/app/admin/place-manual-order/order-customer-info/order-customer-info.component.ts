import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';

@Component({
  selector: 'app-order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss']
})
export class OrderCustomerInfoComponent implements OnInit {
  
  CustomerInfoForm:FormGroup

  ngOnInit(): void {
    this.CreateForm()

  }



  BackStep() {

  }
  NextStep() {
    validateAllFormFields(this.CustomerInfoForm)

  }
  CreateForm(){
    this.CustomerInfoForm = new FormGroup({
      firstName:new FormControl(null,[Validators.required]),
      lastName:new FormControl(null,[]),
      phoneNumber:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(10),Validators.maxLength(13)]),
      email:new FormControl(null,[Validators.email]),
      orderAddress:new FormControl(null,[Validators.required]),
    })
  }
}
