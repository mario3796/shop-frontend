import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { AuthGuard } from './auth/auth.guard';
import { NotAuthGuard } from './auth/not-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'new-product', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orders', children: [
    { path: '', component: OrderListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: ':id', component: OrderDetailsComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'products', children: [
    { path: '', component: ProductListComponent, pathMatch: 'full' },
    { path: ':id', component: ProductDetailsComponent }
  ] },
  { path: 'login', component: AuthComponent, canActivate: [NotAuthGuard] },
  { path: 'signup', component: AuthComponent, canActivate: [NotAuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NotAuthGuard]
})
export class AppRoutingModule { }
