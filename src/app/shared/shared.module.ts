import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorMessagesDirective } from './directives/form-error-messages.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UfklogoComponent } from '../layouts/ufklogo/ufklogo.component';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [
    FormErrorMessagesDirective,
    PaginatorComponent,
    UfklogoComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TabViewModule
  ],
  exports: [
    InputTextModule,
    BadgeModule,
    MenuModule,
    TableModule,
    ButtonModule,
    FormErrorMessagesDirective,
    PaginatorComponent,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputSwitchModule,
    ToastModule,
    InputNumberModule,
    TabViewModule,
    MultiSelectModule,
    InputTextareaModule,
    DividerModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    UfklogoComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
