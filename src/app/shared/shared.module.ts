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

@NgModule({
  declarations: [
    FormErrorMessagesDirective,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [
    InputTextModule,
    BadgeModule,
    MenuModule,
    TableModule,
    ButtonModule,
    FormErrorMessagesDirective,
    PaginatorComponent
  ]
})
export class SharedModule { }
