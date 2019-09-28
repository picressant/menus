import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../../../shared/models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRestService } from "../../../services/user-rest.service";
import { AbstractItemPage } from "../../../../shared/components/pages/abstract-item-page.component";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { Observable } from "rxjs";

@Component({
  selector: 'menus-user-item-page',
  templateUrl: './user-item-page.component.html',
  styleUrls: ['./user-item-page.component.less']
})
export class UserItemPageComponent extends AbstractItemPage<User> implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserRestService,
    private toaster: ToasterService,
    private router: Router
  ) {
    super(route, toaster, 'Utilisateur sauvegardé avec succès', 'Utilisateur créé avec succès');
    this.form = User.form(this.fb);
  }

  get create$(): Observable<User> {
    return this.userService.saveUser(this.form.value);
  }

  get get$(): Observable<User> {
    return this.userService.getUser(this.id);
  }

  onCancelAdd() {
    this.router.navigate(['/main/user'])
  }

  get save$(): Observable<User> {
    return this.userService.saveUser(this.form.value);
  }

}
