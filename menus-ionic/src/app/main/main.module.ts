import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from "./main-shell/main-shell.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { IonicModule } from "@ionic/angular";
import { RecipeModule } from "./recipe/recipe.module";


@NgModule({
    declarations: [
        MainShellComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule,

        RecipeModule

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
