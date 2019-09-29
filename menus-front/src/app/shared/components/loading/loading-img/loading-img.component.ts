import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'menus-loading-img',
  templateUrl: './loading-img.component.html',
  styleUrls: ['./loading-img.component.scss']
})
export class LoadingImgComponent implements OnInit {

  loading: boolean = true;

  @Input()
  src: SafeUrl;

  @Input()
  styles: any;

  constructor() { }

  ngOnInit() {
  }

  onImageLoaded() {
    this.loading = false;
  }
}
