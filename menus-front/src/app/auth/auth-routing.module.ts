import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth.module';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {
      path: '',
      redirectTo: 'login',
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