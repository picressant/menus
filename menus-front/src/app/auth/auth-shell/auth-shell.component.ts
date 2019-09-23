import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'menus-auth-shell',
  templateUrl: './auth-shell.component.html',
  styleUrls: ['./auth-shell.component.less']
})
export class AuthShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get deployPath() {
    return environment.deployUrl;
  }

}
