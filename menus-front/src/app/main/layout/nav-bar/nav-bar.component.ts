import { Component, HostBinding, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'menus-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen = false;

  constructor(
    private router: Router,
    private menuService: MenuService) {

    this.menuService.isOpenChanges.subscribe(
      (isOpen) => this.isOpen = isOpen
    );
  }


  navigate(path: String) {
    this.router.navigate([path]);
    this.menuService.toggleOpen(false);
  }

  ngOnInit() {
  }

}
