import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { EmptyComponent } from './empty/empty.component';
import { ErrorComponent } from './error/error.component';
import { FormComponent } from './form/form.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { ModalComponent } from './modal/modal.component';
import { BackdropComponent } from './modal/backdrop/backdrop.component';

const components = [
    ButtonComponent,
    EmptyComponent,
    ErrorComponent,
    FormComponent,
    LoadingSpinnerComponent,
    MainNavigationComponent,
    ModalComponent,
    BackdropComponent
]

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [components]
})
export class SharedModule {}