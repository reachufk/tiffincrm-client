import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicNavComponent } from './public-nav/public-nav.component';
import { InstantOrder } from './instant-order/instant-order.component';
import { Category } from './category/category.component';
import { Contact } from './contact/contact.component';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  declarations: [
    PublicNavComponent,
    InstantOrder,
    Category,
    Contact
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  exports: [
    PublicNavComponent,
    InstantOrder,
    Category,
    Contact
  ]
})
export class PublicModule { }