import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';

import { environment } from 'src/environments/environment';
import { CatagoriesComponent } from './catagories/catagories.component';
import { CatagoryItemsComponent } from './catagory-items/catagory-items.component';
import { AdminCatagoryService } from './services/admin-catagory.service';
import { AdminUserService } from './services/admin-user.service';
import { AdmiOrdersService } from './services/admin-orders.service'

@NgModule({
  providers: [AdminCatagoryService, AdminUserService, AdmiOrdersService],
  declarations: [DashboardComponent, OrdersComponent, UsersComponent, CatagoriesComponent, CatagoryItemsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AdminModule { }
