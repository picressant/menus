import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../../../shared/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { UserRestService } from "../../../services/user-rest.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: 'menus-user-item-page',
  templateUrl: './user-item-page.component.html',
  styleUrls: ['./user-item-page.component.less']
})
export class UserItemPageComponent implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserRestService
  ) {
    this.form = User.form(this.fb);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    if (!this.isAddingMode) {
      this.userService.getUser(this.id).subscribe(
        (u) => this.form.patchValue(u)
      );
    }
  }

  get isAddingMode() {
    return isNullOrUndefined(this.id);
  }

}
