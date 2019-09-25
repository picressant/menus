import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthShellComponent } from './auth/auth-shell/auth-shell.component';
import { MainShellComponent } from './main/main-shell/main-shell.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthShellComponent, loadChildren: './auth/auth-routing.module#AuthRoutingModule'},
  { path: 'main', component: MainShellComponent, canActivate: [AuthGuard], loadChildren: './main/main-routing.module#MainRoutingModule'},
  {
    path: '',
    redirectTo: 'main/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
