import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';
import { NavEnum } from 'src/app/shared/models/nav.enum';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'menus-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.less']
})
export class MainShellComponent implements OnInit {

  constructor(
    private router: Router,
    private navService: NavService,
    private authService: AuthService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let navChoice: NavEnum;
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

   }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }

}
