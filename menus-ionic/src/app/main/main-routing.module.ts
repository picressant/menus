import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { RecipeListPageComponent } from "./recipe/pages/recipe-list-page/recipe-list-page.component";
import { WeekPageComponent } from "./week/pages/week-page/week-page.component";
import { RecipeItemPageComponent } from "./recipe/pages/recipe-item-page/recipe-item-page.component";
import { ModifyMealPageComponent } from "./week/pages/modify-meal-page/modify-meal-page.component";
import { SideListPageComponent } from "./sides/pages/side-list-page/side-list-page.component";
import { SideItemPageComponent } from "./sides/pages/side-item-page/side-item-page.component";
import { ParametersPageComponent } from "./parameters/pages/parameters-page/parameters-page.component";
import { PrivilegeGuard } from "../shared/guards/privilege-guard.service";
import { UserItemPageComponent } from "./user/pages/user-item-page/user-item-page.component";
import { PrivilegeOrSelfGuard } from "../shared/guards/admin-or-self-guard.service";
import { UserListPageComponent } from "./user/pages/user-list-page/user-list-page.component";
import { GroupItemPageComponent } from "./user/pages/group-item-page/group-item-page.component";
import { Privilege } from "@models/privilege.enum";
import { GroceriesListPageComponent } from "./groceries/pages/groceries-list-page/groceries-list-page.component";

const routes: Routes = [
    { path: 'recipe', component: RecipeListPageComponent },
    { path: 'recipe/add', component: RecipeItemPageComponent },
    { path: 'recipe/:id', component: RecipeItemPageComponent },
    { path: 'week', component: WeekPageComponent },
    { path: 'week/:index', component: ModifyMealPageComponent },
    { path: 'side', component: SideListPageComponent },
    { path: 'side/add', component: SideItemPageComponent },
    { path: 'side/:id', component: SideItemPageComponent },
    { path: 'parameters', component: ParametersPageComponent, canActivate: [PrivilegeGuard], data: {privilege: Privilege.MANAGE_INGREDIENTS} },
    { path: 'user', component: UserListPageComponent, canActivate: [PrivilegeGuard], data: {privilege: Privilege.MANAGE_USERS} },
    { path: 'user/add', component: UserItemPageComponent, canActivate: [PrivilegeGuard], data: {privilege: Privilege.MANAGE_USERS} },
    { path: 'user/:id', component: UserItemPageComponent, canActivate: [PrivilegeOrSelfGuard], data: {privilege: Privilege.MANAGE_USERS} },
    { path: 'user/group/add', component: GroupItemPageComponent, canActivate: [PrivilegeGuard], data: {privilege: Privilege.MANAGE_USERS} },
    { path: 'user/group/:id', component: GroupItemPageComponent, canActivate: [PrivilegeGuard], data: {privilege: Privilege.MANAGE_USERS} },
    { path: 'groceries', component: GroceriesListPageComponent },
    {
        path: '',
        redirectTo: 'week',
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
