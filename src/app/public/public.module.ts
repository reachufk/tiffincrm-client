import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { CategoryComponent } from './category/category.component';
import { CatagoryService } from './services/catagory.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { CartComponent } from './cart/cart.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormerrorDirective } from './services/formerror.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  providers: [CatagoryService],

  declarations: [
    HomeComponent,
    CarouselComponent,
    CategoryComponent,
    CategoryItemsComponent,
    CartComponent,
    FormerrorDirective,
    MyOrdersComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    NgImageSliderModule,
    PrimeNGShadowDOMDirective,
    InputSwitchModule,
    ToastModule,
    DialogModule,
    InputNumberModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RadioButtonModule,
    CalendarModule,
    SelectButtonModule,
    CheckboxModule
  ]
})
export class PublicModule { }
