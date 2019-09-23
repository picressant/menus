import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'menus-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.less']
})
export class MainShellComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }

}
