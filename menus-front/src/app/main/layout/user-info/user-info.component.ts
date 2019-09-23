import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'menus-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.currentUser;
    this.authService.currentUserChange.subscribe(
      (u) => this.user = u
    );
   }

  ngOnInit() {
  }

}
