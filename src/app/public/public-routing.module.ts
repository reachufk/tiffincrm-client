import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/core/guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { CancellationRefundComponent } from './legalize-components/cancellation-refund/cancellation-refund.component';
import { ContactUsComponent } from './legalize-components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './legalize-components/privacy-policy/privacy-policy.component';
import { ShippingDeliveryComponent } from './legalize-components/shipping-delivery/shipping-delivery.component';
import { TermsConditionsComponent } from './legalize-components/terms-conditions/terms-conditions.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicResolver } from './public.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category-items/:category', component: CategoryItemsComponent, resolve: { user: PublicResolver } },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'terms-and-conditions', component: TermsConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cancellation-and-refund', component: CancellationRefundComponent },
  { path: 'shipping-delivery', component: ShippingDeliveryComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
