import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminCatagoryService } from '../../services/admin-catagory.service'
@Component({
  selector: 'app-order-catagory-selection',
  templateUrl: './order-catagory-selection.component.html',
  styleUrls: ['./order-catagory-selection.component.scss']
})
export class OrderCatagorySelectionComponent implements OnInit {

  AvailableCatagories: Observable<any>;
  SelectedCatagories = []

  constructor(private catagoryService: AdminCatagoryService) {

  }

  ngOnInit(): void {
    this.GetCatagories()
  }


  GetCatagories() {
    this.AvailableCatagories = this.catagoryService.GetCatagories().pipe(map((items: any) => items))
  }

  BackStep(){
    
  }
  NextStep(){

  }


}
