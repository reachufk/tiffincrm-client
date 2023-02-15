import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { SharedModule } from './shared/shared.module';
import { FormErrorMessagesDirective } from './shared/directives/form-error-messages.directive';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,    
    SharedModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    PublicLayoutComponent,
    UserLayoutComponent,
    FormErrorMessagesDirective

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
