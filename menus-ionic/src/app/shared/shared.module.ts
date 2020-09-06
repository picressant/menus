import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImgComponent } from "./components/loading/loading-img/loading-img.component";
import { SecurePipe } from "./pipes/secure.pipe";



@NgModule({
  declarations: [
      LoadingImgComponent,
      SecurePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      LoadingImgComponent,
      SecurePipe
  ]
})
export class SharedModule { }
