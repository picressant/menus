import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRecetteComponent } from './recette/search-recette/search-recette.component';
import { ShowRecetteComponent } from './recette/show-recette/show-recette.component';
import { WeekMenusComponent } from './menus/week-menus/week-menus.component';
import { WeekMenusV2Component } from './menus/week-menus-v2/week-menus-v2.component';
import { RecipeSearchComponent } from './main/recipe/recipe-search/recipe-search.component';
import { RecipeShowComponent } from './main/recipe/recipe-show/recipe-show.component';

const routes: Routes = [
  { path: '', component: RecipeSearchComponent },
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
