import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../../shared/models/user.model";
import { UserRestService } from "../../../services/user-rest.service";
import { Router } from "@angular/router";
import { ConfirmationService } from "../../../../shared/services/confirmation.service";

@Component({
  selector: 'menus-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.less']
})
export class UserListPageComponent implements OnInit {

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private userService: UserRestService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this._loadUsers();
  }

  private _loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => this.dataSource.data = users
    );
  }

  edit(user: User) {
    this.router.navigate(['main/user', user.id]);
  }

  delete(user: User) {
    this.confirmationService.confirm("Cette suppression est définitive. Continuer ?").subscribe(
      (res: boolean) => {
        if (res) {
          this.userService.deleteUser(user).subscribe(() => {
            this._loadUsers();
          });
        }
      }
    );
  }

  add() {
    this.router.navigate(['main/user/add']);
  }
}
