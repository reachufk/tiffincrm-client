import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  LatestOrder: any = {};
  selected: any = ''
  constructor(private router: Router) {
    const {url} = router
    this.selected = url?.split('/')[3]
    console.log(this.selected);
    
  }

  ngOnInit(): void {
  }

  handleTabChange(event) {
    const { index } = event;
    switch (index) {
      case 0:
        this.router.navigate(['/admin/orders/latest'])
        break;
      case 1:
        this.router.navigate(['/admin/orders/future'])
        break;
      case 2:
        this.router.navigate(['/admin/orders/completed'])
        break;
      case 3:
        this.router.navigate(['/admin/orders/admin-created'])
        break;
      case 4:
        this.router.navigate(['/admin/orders/admin-completed'])
        break;


    }
  }







}
