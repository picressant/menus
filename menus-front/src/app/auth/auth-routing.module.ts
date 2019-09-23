import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth.module';
import { AuthHomeComponent } from './auth-home/auth-home.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: AuthHomeComponent},
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ];
  
  @NgModule({
    imports: [
        AuthModule,
        RouterModule.forChild(routes)
    ],
  })
  export class AuthRoutingModule { }