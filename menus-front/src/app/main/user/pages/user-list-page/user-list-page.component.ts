import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { IngredientRestService } from "../../../services/ingredient-rest.service";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../../../shared/models/user.model";
import { UserRestService } from "../../../services/user-rest.service";
import { Router } from "@angular/router";

@Component({
  selector: 'menus-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.less']
})
export class UserListPageComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private userService: UserRestService,
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

  }

  add() {
    this.router.navigate(['main/user/add']);
  }
}
