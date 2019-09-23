import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MainModule } from './main.module';
import { ParametersManagementComponent } from './parameters/parameters-management/parameters-management.component';
import { RecipeSearchComponent } from './recipe/recipe-search/recipe-search.component';
import { RecipeShowComponent } from './recipe/recipe-show/recipe-show.component';
import { SidedishSearchComponent } from './sidedish/sidedish-search/sidedish-search.component';
import { WeekShowComponent } from './week/week-show/week-show.component';

const routes: Routes = [
    { path: 'home', component: DashboardComponent},
    { path: 'recipe', component: RecipeSearchComponent },
    { path: 'parameters', component: ParametersManagementComponent },
    { path: 'recipe/add', component: RecipeShowComponent },
    { path: 'recipe/:id', component: RecipeShowComponent },
    { path: 'sidedish', component: SidedishSearchComponent},
    { path: 'week', component: WeekShowComponent},
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
  export class MainRoutingModule { }
