import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthShellComponent } from './auth/auth-shell/auth-shell.component';
import { MainShellComponent } from './main/main-shell/main-shell.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthShellComponent, loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)},
  { path: 'main', component: MainShellComponent, canActivate: [AuthGuard], loadChildren: () => import('./main/main-routing.module').then(m => m.MainRoutingModule)},
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
