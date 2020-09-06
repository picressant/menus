import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthShellComponent } from "./auth-shell/auth-shell.component";
import { IonicModule } from "@ionic/angular";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        AuthShellComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        IonicModule
    ],
    exports: [
        AuthShellComponent
    ]
})
export class AuthModule {
}
