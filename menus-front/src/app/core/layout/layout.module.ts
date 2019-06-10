import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [HeaderBarComponent, FooterComponent, NavBarComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderBarComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class LayoutModule { }
