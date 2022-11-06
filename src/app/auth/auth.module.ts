import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}