import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/layouts/nav/nav.component';
import { ProductComponent } from './components/product/product.component';
import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { OrderComponent } from './components/order/order.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { from } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProductComponent,
    BasketComponent,
    PaymentComponent,
    ProductAddComponent,
    OrderComponent,
    LayoutsComponent,
    FooterComponent,
    ProductUpdateComponent,
    FilterPipePipe,
    LoginComponent,
    SpinnerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(), // npm i @sweetalert2/ngx-sweetalert2 --save
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 3000
    })
  ],
  providers: [
    {provide: 'api', useValue: 'https://webapi.angulareducation.com/api/' },
    {provide: 'validationError', useValue: 'Lütfen tüm alanları doldurunuz!' },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
