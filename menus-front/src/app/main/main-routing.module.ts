import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { MainModule } from './main.module';
import { ParametersManagementPageComponent } from './parameters/pages/parameters-management-page/parameters-management-page.component';
import { RecipeListPageComponent } from './recipe/pages/recipe-list-page/recipe-list-page.component';
import { RecipeItemPageComponent } from './recipe/pages/recipe-item-page/recipe-item-page.component';
import { SidedishListPageComponent } from './sidedish/pages/sidedish-list-page/sidedish-list-page.component';
import { WeekPageComponent } from './week/pages/week-page/week-page.component';
import { UserListPageComponent } from "./user/pages/user-list-page/user-list-page.component";
import { UserItemPageComponent } from "./user/pages/user-item-page/user-item-page.component";

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'recipe', component: RecipeListPageComponent },
  { path: 'parameters', component: ParametersManagementPageComponent },
  { path: 'recipe/add', component: RecipeItemPageComponent },
  { path: 'recipe/:id', component: RecipeItemPageComponent },
  { path: 'sidedish', component: SidedishListPageComponent },
  { path: 'week', component: WeekPageComponent },
  { path: 'user', component: UserListPageComponent },
  { path: 'user/add', component: UserItemPageComponent },
  { path: 'user/:id', component: UserItemPageComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    MainModule,
    RouterModule.forChild(routes),
  ]
})
export class MainRoutingModule {
}
