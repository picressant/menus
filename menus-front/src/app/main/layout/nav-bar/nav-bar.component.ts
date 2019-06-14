import { Component, OnInit, HostBinding } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { NavEnum } from 'src/app/shared/models/nav.enum';
import { MenuService } from '../service/menu.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menus-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  currentNav: NavEnum;

  @HostBinding('class.is-open')
  isOpen = false;

  constructor(
    private navService: NavService,
    private router: Router,
    private menuService: MenuService) {
    this.currentNav = this.navService.currentNav;

    this.navService.navChange.subscribe(
      (page) => this.currentNav = page
    );

    this.menuService.isOpenChanges.subscribe(
      (isOpen) => this.isOpen = isOpen
    );
  }

  get isRecipesSelected() {
    return this.currentNav === NavEnum.RECIPES;
  }

  get isMenusSelected() {
    return this.currentNav === NavEnum.MENUS;
  }

  get isHomeSelected() {
    return this.currentNav === NavEnum.HOME;
  }

  get isSideSelected() {
    return this.currentNav === NavEnum.SIDE;
  }

  navigate(path: String) {
    this.router.navigate([path]);
    this.menuService.toggleOpen(false);
  }

  ngOnInit() {
  }

}
