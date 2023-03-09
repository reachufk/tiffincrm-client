import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { CatagoriesComponent } from './catagories/catagories.component';
import { CatagoryItemsComponent } from './catagory-items/catagory-items.component';
import { AdminCatagoryService } from './services/admin-catagory.service';
import { AdminUserService } from './services/admin-user.service';
import { AdminOrdersService } from './services/admin-orders.service';
import { FutureOrdersComponent } from './orders/future-orders/future-orders.component';
import { LatestOrdersComponent } from './orders/latest-orders/latest-orders.component';
import { CompletedOrdersComponent } from './orders/completed-orders/completed-orders.component';
import { OrderInvoiceComponent } from './orders/order-invoice/order-invoice.component'
import { PlaceManualOrderComponent } from './place-manual-order/place-manual-order.component';
import { OrderCustomerInfoComponent } from './place-manual-order/order-customer-info/order-customer-info.component';
import { OrderItemsSelectionComponent } from './place-manual-order/order-items-selection/order-items-selection.component';
import { OrderPreviewComponent } from './place-manual-order/order-preview/order-preview.component';
import { AdminCreatedOrdersComponent } from './orders/admin-created-orders/admin-created-orders.component';
import { MessageService } from 'primeng/api';
import { BannersComponent } from './banners/banners.component';
import { ChartModule } from "primeng/chart";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { AdminCompletedOrdersComponent } from './orders/admin-completed-orders/admin-completed-orders.component'

@NgModule({
  providers: [AdminCatagoryService, AdminUserService, AdminOrdersService, MessageService],
  declarations: [DashboardComponent,
    OrdersComponent,
    UsersComponent,
    CatagoriesComponent,
    CatagoryItemsComponent,
    FutureOrdersComponent,
    LatestOrdersComponent,
    CompletedOrdersComponent,
    OrderInvoiceComponent,
    PlaceManualOrderComponent,
    OrderCustomerInfoComponent,
    OrderItemsSelectionComponent,
    OrderPreviewComponent,
    AdminCreatedOrdersComponent,
    BannersComponent,
    AdminCompletedOrdersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPrintModule,
    StepsModule,
    PickListModule,
    ChartModule,
    CalendarModule,
    CheckboxModule
  ]
})
export class AdminModule { }
