import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { RecipeListPageComponent } from "./recipe/pages/recipe-list-page/recipe-list-page.component";
import { WeekPageComponent } from "./week/pages/week-page/week-page.component";
import { RecipeItemPageComponent } from "./recipe/pages/recipe-item-page/recipe-item-page.component";
import { ModifyMealPageComponent } from "./week/pages/modify-meal-page/modify-meal-page.component";

const routes: Routes = [
    { path: 'recipe', component: RecipeListPageComponent },
    { path: 'recipe/add', component: RecipeItemPageComponent },
    { path: 'recipe/:id', component: RecipeItemPageComponent },
    { path: 'week', component: WeekPageComponent },
    { path: 'week/:index', component: ModifyMealPageComponent },
    {
        path: '',
        redirectTo: 'recipe',
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
