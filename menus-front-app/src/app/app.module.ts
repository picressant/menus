import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material/material.module';
import { RecetteModule } from './recette/recette.module';
import { MenusModule } from './menus/menus.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestInterceptor } from './common/interceptors/rest.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    AppRoutingModule,    
    LayoutModule,
    MaterialModule,
    RecetteModule,
    MenusModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
