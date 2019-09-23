import { Component, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'menus-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.less']
})
export class HeaderBarComponent implements OnInit {

  isOpen: boolean = false;

  constructor(
    private menuService: MenuService
  ) { 
    this.menuService.isOpenChanges.subscribe(
      (isOpen) => this.isOpen = isOpen
    );
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuService.toggleOpen(!this.menuService.isOpen);
  }

  get deployUrl() {
    return environment.deployUrl;
  }
}
