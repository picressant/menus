import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { NavEnum } from './shared/models/nav.enum';
import { NavService } from './shared/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    titleService: Title) {
    titleService.setTitle('Food organistator');
  }


}
