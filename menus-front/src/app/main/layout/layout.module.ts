import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [HeaderBarComponent, FooterComponent, NavBarComponent, UserInfoComponent],
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
