import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannersComponent } from './banners/banners.component';
import { CatagoriesComponent } from './catagories/catagories.component';
import { CatagoryItemsComponent } from './catagory-items/catagory-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminCompletedOrdersComponent } from './orders/admin-completed-orders/admin-completed-orders.component';
import { AdminCreatedOrdersComponent } from './orders/admin-created-orders/admin-created-orders.component';
import { CompletedOrdersComponent } from './orders/completed-orders/completed-orders.component';
import { FutureOrdersComponent } from './orders/future-orders/future-orders.component';
import { LatestOrdersComponent } from './orders/latest-orders/latest-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderCustomerInfoComponent } from './place-manual-order/order-customer-info/order-customer-info.component';
import { OrderItemsSelectionComponent } from './place-manual-order/order-items-selection/order-items-selection.component';
import { OrderPreviewComponent } from './place-manual-order/order-preview/order-preview.component';
import { PlaceManualOrderComponent } from './place-manual-order/place-manual-order.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent,
  children:[
    {path:'',redirectTo:'latest',pathMatch:'full'},
    {path:"latest",component:LatestOrdersComponent},
    {path:'future',component:FutureOrdersComponent},
    {path:'completed',component:CompletedOrdersComponent},
    {path:'admin-created',component:AdminCreatedOrdersComponent},
    {path:'admin-completed',component:AdminCompletedOrdersComponent}
  ]
},
  { path: 'users', component: UsersComponent },
  { path: 'catagories', component: CatagoriesComponent },
  { path: 'cataggory-items/:catagory', component: CatagoryItemsComponent },
  { path: 'banners', component: BannersComponent },
  {
    path: 'place-order', component: PlaceManualOrderComponent,
    children: [
      { path: '', redirectTo: 'customer-info', pathMatch: 'full' },
      { path: 'customer-info', component: OrderCustomerInfoComponent },
      { path: 'items-selection', component: OrderItemsSelectionComponent },
      { path: 'order-preview', component: OrderPreviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
