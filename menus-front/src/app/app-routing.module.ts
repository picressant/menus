import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeSearchComponent } from './main/recipe/recipe-search/recipe-search.component';
import { RecipeShowComponent } from './main/recipe/recipe-show/recipe-show.component';
import { ParametersManagementComponent } from './main/parameters/parameters-management/parameters-management.component';

const routes: Routes = [
  { path: '', component: RecipeSearchComponent },
  { path: 'parameters', component: ParametersManagementComponent },
  { path: 'recipe/add', component: RecipeShowComponent },  
  { path: 'recipe/:id', component: RecipeShowComponent },
  // { path: 'recette', component: ShowRecetteComponent },  
  // { path: 'menus', component: WeekMenusComponent },
  // { path: 'menusV2', component: WeekMenusV2Component }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
