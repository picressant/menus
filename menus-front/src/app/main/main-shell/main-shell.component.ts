import { Component, OnInit } from '@angular/core';
import { FoodAuthService } from 'src/app/shared/services/food-auth.service';

@Component({
  selector: 'menus-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.less']
})
export class MainShellComponent implements OnInit {

  constructor(
    private authService: FoodAuthService
  ) {
  }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }

}
