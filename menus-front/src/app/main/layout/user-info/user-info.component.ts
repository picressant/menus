import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FoodAuthService } from 'src/app/shared/services/food-auth.service';

@Component({
  selector: 'menus-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {

  user: User;
  timestamp: string;

  constructor(
    private authService: FoodAuthService
  ) {
    this.authService.user.subscribe(
      (u) => {
        this.user = u;
        this.timestamp = new Date().getTime().toString();
      }
    );
   }

  ngOnInit() {
    this.user = this.authService.user.getValue();
  }

  get imgStyles() {
    return {
      width: '50px',
      height: '50px',
      'border-radius': '50%',
      'object-fit': 'cover'
    };
  }

  logout() {
    this.authService.logout();
  }
}
