import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item/order-item.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CommonModule } from '@angular/common';

const components = [
    OrderListComponent,
    OrderItemComponent,
    OrderDetailsComponent
]

@NgModule({
    declarations: [components],
    imports: [
        RouterModule,
        SharedModule,
        CommonModule,
        OrderRoutingModule
    ],
    exports: [components]
})
export class OrderModule {}