import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard } from './auth/core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PublicResolver } from './public/public.resolver';
import { TiffinLandingComponent } from './tiffin-landing/tiffin-landing.component';
import { OrderPlacedComponent } from './public/order-placed/order-placed.component';
import { NotFoundComponent } from './layouts/NotFound/notfound.component';
import { TermsConditionsComponent } from './public/legalize-components/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './public/legalize-components/privacy-policy/privacy-policy.component';
import { CancellationRefundComponent } from './public/legalize-components/cancellation-refund/cancellation-refund.component';
import { ShippingDeliveryComponent } from './public/legalize-components/shipping-delivery/shipping-delivery.component';
import { ContactUsComponent } from './public/legalize-components/contact-us/contact-us.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tiffin-aaw',
    pathMatch: 'full'
  },
  {
    path: 'tiffin-aaw',
    component: TiffinLandingComponent
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    resolve: {
      user: PublicResolver
    },
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'order-placed',
    component: OrderPlacedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "top"
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
