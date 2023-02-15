import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorMessagesDirective } from './directives/form-error-messages.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [
    InputTextModule
  ]
})
export class SharedModule { }
