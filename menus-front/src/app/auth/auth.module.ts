import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthShellComponent } from './auth-shell/auth-shell.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthBarComponent } from './auth-bar/auth-bar.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';

@NgModule({
  declarations: [
    AuthShellComponent,
    LoginComponent, AuthBarComponent, AuthHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthShellComponent
  ]
})
export class AuthModule { }
