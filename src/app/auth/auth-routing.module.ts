import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NotAuthGuard } from './not-auth.guard';

const routes: Routes = [
    { path: 'login', component: AuthComponent, canActivate: [NotAuthGuard] },
    { path: 'signup', component: AuthComponent, canActivate: [NotAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NotAuthGuard]
})
export class AuthRoutingModule {}
