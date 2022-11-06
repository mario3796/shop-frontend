import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart.component';

const components = [
    CartComponent,
    CartItemComponent
]

@NgModule({
    declarations: [components],
    imports: [
        SharedModule,
        CommonModule,
        CartRoutingModule
    ],
    exports: [components]
})
export class CartModule {}