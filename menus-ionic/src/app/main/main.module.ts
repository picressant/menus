import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from "./main-shell/main-shell.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { IonicModule } from "@ionic/angular";
import { RecipeModule } from "./recipe/recipe.module";
import { LayoutModule } from "./layout/layout.module";
import { WeekModule } from "./week/week.module";
import { SidesModule } from "./sides/sides.module";


@NgModule({
    declarations: [
        MainShellComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule,

        LayoutModule,

        RecipeModule,
        WeekModule,
        SidesModule

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
export class MainModule {
}
