import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/core/guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PublicResolver } from './public.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category-items/:category', component: CategoryItemsComponent, resolve: { user: PublicResolver } },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
