import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { path: '', component: OrderListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: ':id', component: OrderDetailsComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {}