import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { PublicNavComponent } from './public-nav/public-nav.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { CatagoryService } from './services/catagory.service';

@NgModule({
  providers: [CatagoryService],

  declarations: [
    HomeComponent,
    PublicNavComponent,
    CarouselComponent,
    CategoryComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    CarouselModule
  ]
})
export class PublicModule { }
