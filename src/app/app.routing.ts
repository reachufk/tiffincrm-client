import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    }]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
