import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MainNavigationComponent } from './shared/main-navigation/main-navigation.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductItemComponent } from './product/product-list/product-item/product-item.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { FormComponent } from './shared/form/form.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './shared/error/error.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { EmptyComponent } from './shared/empty/empty.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ButtonComponent } from './shared/button/button.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderItemComponent } from './order/order-list/order-item/order-item.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    EditProductComponent,
    FormComponent,
    AuthComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    EmptyComponent,
    NotFoundComponent,
    CartComponent,
    CartItemComponent,
    ButtonComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
