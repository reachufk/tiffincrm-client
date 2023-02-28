import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorInterceptor } from './auth/core/interceptors/error.interceptor';
import { PublicNavComponent } from './public/public-nav/public-nav.component';
import { AuthInterceptor } from './auth/core/interceptors/auth.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    PublicNavComponent,
    PublicLayoutComponent,
    UserLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
