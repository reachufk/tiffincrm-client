import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorMessagesDirective } from './directives/form-error-messages.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'
import {BadgeModule} from 'primeng/badge';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PoweredBy } from '../public/powered-by/powered-by.component';
import { DividerModule} from 'primeng/divider'
@NgModule({
  declarations: [
    FormErrorMessagesDirective,
    PaginatorComponent,
    PoweredBy
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DividerModule
  ],
  exports: [
    InputTextModule,
    BadgeModule,
    MenuModule,
    TableModule,
    ButtonModule,
    FormErrorMessagesDirective,
    PaginatorComponent,
    PoweredBy,
    DividerModule
  ]
})
export class SharedModule { }
