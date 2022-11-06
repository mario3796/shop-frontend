import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { path: '', component: ProductListComponent, pathMatch: 'full' },
    { path: 'new-product', component: EditProductComponent, canActivate: [AuthGuard] },
    { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ProductDetailsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}