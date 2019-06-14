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
  title = 'menus-front-app';

  constructor(
    router: Router,
    navService: NavService,
    titleService: Title) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let navChoice: NavEnum;

        console.log(event.urlAfterRedirects);

        if (event.urlAfterRedirects.startsWith('/main/recipe'))
          navChoice = NavEnum.RECIPES;
        else if (event.urlAfterRedirects.startsWith('/main/week'))
          navChoice = NavEnum.MENUS;
        else if (event.urlAfterRedirects.startsWith('/main/parameters'))
          navChoice = NavEnum.PARAMETERS;
        else if (event.urlAfterRedirects.startsWith("/main/home"))
          navChoice = NavEnum.HOME;
        else if (event.urlAfterRedirects.startsWith("/main/sidedish"))
          navChoice = NavEnum.SIDE;

        navService.changeNav(navChoice);
      }
    });

    titleService.setTitle('Food organistator');
  
  }


}
