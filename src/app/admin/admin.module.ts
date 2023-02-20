import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { CatagoriesComponent } from './catagories/catagories.component';
import { CatagoryItemsComponent } from './catagory-items/catagory-items.component';
import { AdminCatagoryService } from './services/admin-catagory.service';
import { AdminUserService } from './services/admin-user.service';
import { AdmiOrdersService } from './services/admin-orders.service';
import { FutureOrdersComponent } from './orders/future-orders/future-orders.component';
import { LatestOrdersComponent } from './orders/latest-orders/latest-orders.component';
import { CompletedOrdersComponent } from './orders/completed-orders/completed-orders.component';
import { OrderInvoiceComponent } from './orders/order-invoice/order-invoice.component'
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  providers: [AdminCatagoryService, AdminUserService, AdmiOrdersService],
  declarations: [DashboardComponent, OrdersComponent, UsersComponent, CatagoriesComponent, CatagoryItemsComponent, FutureOrdersComponent, LatestOrdersComponent, CompletedOrdersComponent, OrderInvoiceComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPrintModule
  ]
})
export class AdminModule { }
