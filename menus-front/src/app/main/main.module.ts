import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { MainShellComponent } from './main-shell/main-shell.component';
import { ParametersModule } from './parameters/parameters.module';
import { RecipeModule } from './recipe/recipe.module';
import { SidedishModule } from './sidedish/sidedish.module';
import { WeekModule } from './week/week.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserModule } from "./user/user.module";

@NgModule({
  declarations: [
    MainShellComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    RecipeModule,
    DashboardModule,
    WeekModule,
    LayoutModule,
    SidedishModule,
    ParametersModule,
    UserModule
  ],
  exports: [
    MainShellComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class MainModule { }
