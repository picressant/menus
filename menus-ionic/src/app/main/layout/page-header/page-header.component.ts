import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  backRef: string;

  @Input()
  backButton = false;

  constructor() { }

  ngOnInit() {}

}
