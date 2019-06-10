import { Injectable } from '@angular/core';
import { NavEnum } from '../models/nav.enum';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  currentNav: NavEnum = NavEnum.RECIPES;
  navChange: Subject<NavEnum> = new Subject<NavEnum>();

  constructor(private router: Router) {
    this.navChange.subscribe((value) => {
      this.currentNav = value
    });
  }

  changeNav(channel: NavEnum) {
    this.navChange.next(channel);
  }
}
